import { mount } from '@vue/test-utils';
import History from '../src/components/web/components/history.vue';

describe('History Component', () => {
  it('should load history from localStorage', () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' },
      { id: '2', content: 'Hi', timestamp: '2023-01-02' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    expect(wrapper.vm.historyList).toEqual(mockHistory);
  });

  it('should emit select event when history item is clicked', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    await wrapper.find('.history-item').trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')?.[0]).toEqual([mockHistory[0]]);
  });

  it('should save new history to localStorage', () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    const newMessage = { id: '2', content: 'Hi', timestamp: '2023-01-02' };
    wrapper.vm.saveHistory(newMessage);

    const updatedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    expect(updatedHistory).toEqual([...mockHistory, newMessage]);
  });

  it('should handle empty history', () => {
    localStorage.removeItem('chatHistory');

    const wrapper = mount(History);
    expect(wrapper.vm.historyList).toEqual([]);
  });

  it('should render history items correctly', () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    const historyItem = wrapper.find('.history-item');
    expect(historyItem.text()).toContain('Hello');
    expect(historyItem.text()).toContain('2023-01-01');
  });

  it('should apply hover styles on history item', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    const historyItem = wrapper.find('.history-item');
    expect(historyItem.classes()).not.toContain('hover:bg-gray-100');

    await historyItem.trigger('mouseover');
    expect(historyItem.classes()).toContain('hover:bg-gray-100');
  });

  it('should delete history item', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    await wrapper.find('.delete-button').trigger('click');
    expect(wrapper.vm.historyList).toEqual([]);
    expect(localStorage.getItem('chatHistory')).toBeNull();
  });

  it('should paginate history items', async () => {
    const mockHistory = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      content: `Message ${i + 1}`,
      timestamp: `2023-01-${i + 1}`
    }));
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    expect(wrapper.findAll('.history-item').length).toBe(10);

    await wrapper.find('.load-more').trigger('click');
    expect(wrapper.findAll('.history-item').length).toBe(20);
  });

  it('should filter history items by search term', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' },
      { id: '2', content: 'Hi', timestamp: '2023-01-02' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    await wrapper.find('.search-input').setValue('Hello');
    expect(wrapper.findAll('.history-item').length).toBe(1);
    expect(wrapper.find('.history-item').text()).toContain('Hello');
  });

  it('should sort history items by timestamp', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-02' },
      { id: '2', content: 'Hi', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    await wrapper.find('.sort-button').trigger('click');
    expect(wrapper.findAll('.history-item')[0].text()).toContain('Hi');
    expect(wrapper.findAll('.history-item')[1].text()).toContain('Hello');
  });

  it('should export history to file', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    localStorage.setItem('chatHistory', JSON.stringify(mockHistory));

    const wrapper = mount(History);
    await wrapper.find('.export-button').trigger('click');
    expect(wrapper.emitted('export')).toBeTruthy();
    expect(wrapper.emitted('export')?.[0]).toEqual([mockHistory]);
  });

  it('should import history from file', async () => {
    const mockHistory = [
      { id: '1', content: 'Hello', timestamp: '2023-01-01' }
    ];
    const file = new File([JSON.stringify(mockHistory)], 'history.json', { type: 'application/json' });

    const wrapper = mount(History);
    await wrapper.find('.import-input').setValue(file);
    expect(wrapper.vm.historyList).toEqual(mockHistory);
    expect(localStorage.getItem('chatHistory')).toEqual(JSON.stringify(mockHistory));
  });
}); 