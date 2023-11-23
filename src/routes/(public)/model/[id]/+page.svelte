
<script lang="ts">

    import { Enviroment, PageLoader } from '$lib/lib.js';
    import { onMount } from 'svelte';
    import Loader from '$lib/components/loader.svelte';
    import Model from '$lib/components/model.svelte';

    export let form;
    export let data;

    const id: string = data.id == null ? "1" : data.id;

    $: isFetching = form == null;

    $: modelData = form == null ? {} : form.res_a.DATA[0];
    $: model = form == null ? null : PageLoader.stringToBuffer(form.res_c);
    $: userData = form == null ? {} : form.res_b.DATA[0];
    $: articleData = form == null ? {} : form.res_d.DATA[0];


    onMount(() =>{
        
        const fd = new FormData();
        fd.append("id", id);

        const url = `${Enviroment.ROOT_URL}/model/[id]?/loadData`;

        PageLoader.fetchData(fd, url);
        
    });

</script>


<!-- Product section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="my-3">
            <a class="btn btn-outline dark btn-lg" href="{Enviroment.ROOT_URL}/articles/{modelData.c05}">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
            </a>
        </div>
        {#if isFetching}
            <Loader />
        {:else}
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-8">
                <Model file={model} />
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
                        <th scope="row">MODEL BY:</th>
                        <td>{userData.c02}</td>
                      </tr>
                      <tr>
                        <th scope="row">WEIGHT:</th>
                        <td>{modelData.c07}</td>
                      </tr>
                      <tr>
                        <th scope="row">FOR ARTICLE:</th>
                        <td>{articleData.c02}</td>
                      </tr>
                    </tbody>
                </table>


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