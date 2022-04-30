<script setup>
import { onMounted, watch, ref } from "@vue/runtime-core";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const dialog = ref();

onMounted(() => {
  const mydialog = new bootstrap.Modal(dialog.value);

  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue) mydialog.show();
      else mydialog.hide();
    }
  );
});
</script>

<template lang="pug">
.modal.fade#exampleModal( ref='dialog' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true")
  .modal-dialog
    .modal-content
      .modal-header
        h5.modal-title#exampleModalLabel 
            slot(name='title') 
        button.btn-close(type="button" @click='$emit("update:modelValue", false)' aria-label="Close")
      .modal-body
        slot(name='body')
        

</template>
