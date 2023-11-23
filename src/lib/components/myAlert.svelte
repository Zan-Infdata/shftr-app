<script lang="ts">

    export let txt: string = "--DEFAULT TEXT--";
    export let isSuccess: boolean = false;


</script>


<div class="alert alert-dismissible fade show" class:alert-success={isSuccess} class:alert-danger={!isSuccess} role="alert">
    {txt}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>