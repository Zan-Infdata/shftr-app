<script lang="ts">
    export let isChecked: boolean = false;
</script>


{#if isChecked}
    <i class="bi bi-check-circle text-success"></i>
{:else}
    <i class="bi bi-x-circle text-danger"></i>
{/if}