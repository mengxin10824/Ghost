<template></template>

<script lang="ts" setup>
const emit = defineEmits(["update:prompt"]);

const handlePrompt = (prompt: string) => {
  emit("update:prompt", prompt);
};

defineExpose({
  handlePrompt,
});
</script>
