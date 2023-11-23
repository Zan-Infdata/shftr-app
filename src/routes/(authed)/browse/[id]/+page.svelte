<script lang="ts">

    import { Enviroment, ModelController, PageLoader } from '$lib/lib.js';
    import Loader from '$lib/components/loader.svelte';
    import Model from '$lib/components/model.svelte';
    import MyAlert from '$lib/components/myAlert.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    export let form;
    export let data;

    const user = $page.data.user;
    const isAdmin = user.c03;

    let fileInput: HTMLInputElement;
    let nameInput: HTMLInputElement;
    let btnInput: HTMLButtonElement;
    let fileErr: HTMLDivElement;

    let screenshot: boolean = false;
    let captureFrame: boolean = false;

    const id: string = data.id == null ? "1" : data.id;

    let isUploading: boolean = false;
    let showAlert: boolean = false;

    let isSuccessAlert: boolean = false;
    let alertText: string = "";
    
    $: isFetching = form == null;
    $: article = form == null ? {} : form.res_a.DATA[0];
    $: model = form == null ? null : PageLoader.stringToBuffer(form.res_c);


    onMount(() =>{

        
        const fd = new FormData();
        fd.append("id", id);

        const url = `${Enviroment.ROOT_URL}/browse/[id]?/loadData`;

        PageLoader.fetchData(fd, url);
        
    });

    

    //0 - ok, 2 - no file. 3 - file ext err
    function checkFile(){

        const file = fileInput.files![0];

        if(file == undefined){
            return 2;
        }

        const ext = file.name.split(".").pop();
        if(!ModelController.EXTENTIONS.includes(ext!)){
            return 3;
        }

        return 0;
    }

    //0 - ok, 1 - name err, 2 - no file, 3 - file ext err
    function validateForm(){

        nameInput.classList.remove("is-invalid");
        fileInput.classList.remove("is-invalid");

        if(nameInput.value.trim() == ""){
            return 1;
        }
        else {
            return checkFile();
        }
    }


    async function uploadModel(){

        const check: number = validateForm();

        switch (check) {

            case 1:
                nameInput.classList.add("is-invalid");
                break;

            case 2:
                fileErr.innerHTML = "Please select a file to upload";
                fileInput.classList.add("is-invalid");
                break;

            case 3:
                fileErr.innerHTML = `You can only upload ${ModelController.EXTENTIONS} files`;
                fileInput.classList.add("is-invalid");
                break;



            case 0:
                btnInput.disabled = true;
                isUploading = true;

                const fData: FormData = new FormData();
                fData.append('file', fileInput.files![0]);
                fData.append('modName', nameInput.value);
                fData.append('userName', $page.data.user.c02);
                fData.append('aid', id);

                const url = `${Enviroment.ROOT_URL}/upload?/model`;


                const headers: Headers = new Headers();
                headers.set('Content-Type', 'multipart/form-data');
                headers.set('Accept', 'multipart/form-data');

                const request: RequestInfo = new Request(url, {
                    method: 'POST',
                    body: fData,
                });

                const response = await fetch(request);
                const res = await response.json();
                

                if(res.err){
                    displayAlert("Error: " + res.message, false);
                }
                else {
                    isUploading = false;

                    displayAlert("Upload successful", true);

                    resetForm();
                }
                break;
        }


    }

    function displayAlert(txt: string, success: boolean ){
        isSuccessAlert = success;
        alertText = txt;
        showAlert = true;
    }


    function resetForm(){
        fileInput.value = "";
        nameInput.value = "";

        isUploading = false;

    }

    function takePicture(){
        screenshot = true;
        captureFrame = true;
    }




</script>




<!-- Product section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="my-3">
            <a class="btn btn-outline dark btn-lg" href="{Enviroment.ROOT_URL}/browse">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
            </a>
        </div>
        {#if isFetching}
            <Loader />
        {:else}
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-8">
                {#if isAdmin}
                    <Model file={model} bind:screenshot={screenshot} bind:captureFrame={captureFrame} id={id} isArticle={true}/>
                {:else}
                    <Model file={model} />
                {/if}
            </div>
            <div class="col-md-4">
                <!--<div class="small mb-1">SKU: BST-498</div>-->
                <h1 class="display-5 fw-bolder">{article.c02}</h1>
                <!--<div class="fs-5 mb-5">
                    <span class="text-decoration-line-through">$45.00</span>
                    <span>$40.00</span>
                </div>-->
                <p class="lead">{article.c03}</p>
                {#if isAdmin}
                <div class="d-flex">
                    <a class="btn btn-outline-dark flex-shrink-0 me-3" href="{Enviroment.ROOT_URL}/artedit/{id}">
                        <i class="bi bi-pencil-square"></i>
                        Edit
                    </a>
                    {#if !screenshot}
                        <button id='new-pic' class='btn btn-outline-primary mt-auto' type='button' on:click={takePicture}>Take a new picture</button> 
                    {:else}
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    {/if}
                </div>
                {/if}
            </div>
        </div>
        {/if}
    </div>
</section>

<!-- New model section -->
<section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 mt-5">
        {#if isFetching}
            <div class="col mb-5 d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {:else}
            <h2 class="fw-bolder mb-4">Upload your model</h2>

            <form>
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="name" class="form-label">Model name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="name" bind:this={nameInput}>
                        <div class="invalid-feedback">
                            Please enter a name.
                        </div>
                    </div>

                    <div class="mb-3 col-md-6">
                        <label for="file" class="form-label">Model file</label>
                        <input class="form-control" type="file" id="file" bind:this={fileInput}>
                        <div id="text" class="form-text">File has to be a {ModelController.EXTENTIONS} file</div>
                        <div class="invalid-feedback" bind:this={fileErr}></div>
                    </div>
                </div>
                {#if !isUploading}
                    <button type="button" class="btn btn-primary" on:click={uploadModel} bind:this={btnInput}>Upload</button>
                {:else}
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                {/if}
            </form>
            <div class="mt-2">
            {#if showAlert}
                <MyAlert txt={alertText} isSuccess={isSuccessAlert}/> 
            {/if}
            </div>


        {/if}
        
    </div>
</section>



<style>

</style>