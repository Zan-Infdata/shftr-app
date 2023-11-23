
<script lang="ts">

    import { Enviroment, PageLoader } from '$lib/lib.js';
    import { onMount } from 'svelte';
    import Loader from '$lib/components/loader.svelte';
    import Model from '$lib/components/model.svelte';
    import MyAlert from '$lib/components/myAlert.svelte';

    export let form;
    export let data;

    let weightField: HTMLInputElement;
    let verBtn: HTMLButtonElement;

    let screenshot: boolean = false;
    let captureFrame: boolean = false;

    let isVerifying: boolean = false;

    let weight: number = 0;

    let showAlert: boolean = false;
    let isSuccessAlert: boolean = false;
    let alertText: string = "";

    const id: string = data.id == null ? "1" : data.id;

    $: isFetching = form == null;

    $: modelData = form == null ? {} : form.res_a.DATA[0];
    $: model = form == null ? null : PageLoader.stringToBuffer(form.res_c);
    $: userData = form == null ? {} : form.res_b.DATA[0];
    $: articleData = form == null ? {} : form.res_d.DATA[0];
    

    onMount(() =>{
        
        const fd = new FormData();
        fd.append("id", id);

        const url = `${Enviroment.ROOT_URL}/models/unverified/[id]?/loadData`;

        PageLoader.fetchData(fd, url);
        
    });

    function takePicture(){
        screenshot = true;
        captureFrame = true;
    }


    async function verifyModel(){

        weightField.classList.remove("is-invalid");
        const check: boolean = Number.isInteger(weight) && weight > 0 ;
        

        if(!check) {
            weightField.classList.add("is-invalid");
        }
        else {
            verBtn.disabled = true;
            isVerifying = true;

            const fData: FormData = new FormData();
            fData.append('mid', id);
            fData.append('weight', weight.toString());
            

            const url = `${Enviroment.ROOT_URL}/update?/verify`;


            const headers: Headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');

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
                isVerifying = false;
                displayAlert("Successfully verified the model!", true);

            }
        }
         
    }

    function displayAlert(txt: string, success: boolean ){
        isSuccessAlert = success;
        alertText = txt;
        showAlert = true;
    }

</script>


<!-- Product section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="my-3">
            <a class="btn btn-outline dark btn-lg" href="{Enviroment.ROOT_URL}/models/unverified">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
            </a>
        </div>
        {#if isFetching}
            <Loader />
        {:else}

        {#if showAlert}
            <MyAlert txt={alertText} isSuccess={isSuccessAlert}/> 
        {/if}
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-8">
                <Model file={model} bind:screenshot={screenshot} bind:captureFrame={captureFrame} id={id} isArticle={false}/>
            </div>
            <div class="col-md-4">
                <!--<div class="small mb-1">SKU: BST-498</div>-->
                <h1 class="display-5 fw-bolder">{modelData.c02}</h1>
                <!--<div class="fs-5 mb-5">
                    <span class="text-decoration-line-through">$45.00</span>
                    <span>$40.00</span>
                </div>-->
                <!--<p class="lead">Description</p>-->

                
                <table class="table">
                    <tbody>
                        <tr>
                            <th scope="row">ID:</th>
                            <td>{modelData.c01}</td>
                        </tr>
                        <tr>
                            <th scope="row">MODEL BY:</th>
                            <td>{userData.c02}</td>
                        </tr>
                        <tr>
                            <th scope="row">FOR ARTICLE:</th>
                            <td>{articleData.c02}</td>
                        </tr>
                        <tr>
                            <th scope="row">FILE:</th>
                            <td>{modelData.c06}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="card ">
                    <div class='card-body'>
                        <form > 
                            
                            <div class='row mb-2'> 
                                <label for='nf' class='col-sm-4 col-form-label'>Weight:</label> 
                                <div class='col-sm-4'> 
                                    <div class='input-group'> 
                                        <input id='nf' type='number' min="0" step="1" class='form-control' bind:this={weightField} bind:value={weight}> 
    
                                        <div class='invalid-feedback'>  
                                            Enter a valid weight
                                        </div>  
            
                                    </div> 
                                </div> 
                            </div> 


                            <hr class= 'mt-4 mb-4'>


                            <div class='row mb-2'>  
                                <label for='new-pic' class='col-sm-5 col-form-label'>Preview image:</label> 
                                <div class='col-sm-6 form-check form-switch'> 
                                    {#if !screenshot}
                                        <button id='new-pic' class='btn btn-outline-primary mt-auto' type='button' on:click={takePicture}>Take picture</button> 
                                    {:else}
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    {/if}
                                    
                                </div> 
                            </div> 

                    </div>
                </div>
    
    
                <div class="card-footer p-4 bg-transparent">
                    {#if !isVerifying}
                        <button class="btn btn-outline-dark mt-auto" on:click={verifyModel} bind:this={verBtn}>Verify</button>
                    {:else}
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    {/if}
                    
                </div>


                <!--<div class="d-flex">
                    <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                    <button class="btn btn-outline-dark flex-shrink-0" type="button">
                        <i class="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>
                </div>-->
            </div>
        </div>
        {/if}

    </div>
</section>