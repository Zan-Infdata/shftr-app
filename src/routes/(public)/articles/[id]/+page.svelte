<script lang="ts">

    import { Enviroment, PageLoader } from '$lib/lib.js';
    import Loader from '$lib/components/loader.svelte';
    import Model from '$lib/components/model.svelte';
    import MyImg from '$lib/components/myImg.svelte';
    import { onMount } from 'svelte';

    export let form;
    export let data;

    const id: string = data.id == null ? "1" : data.id;

    
    $: isFetching = form == null;
    $: article = form == null ? {} : form.res_a.DATA[0];
    $: models = form == null ? [] : form.res_b.DATA;
    $: model = form == null ? null : PageLoader.stringToBuffer(form.res_c);


    onMount(() =>{

        
        const fd = new FormData();
        fd.append("id", id);

        const url = `${Enviroment.ROOT_URL}/articles/[id]?/loadData`;

        PageLoader.fetchData(fd, url);
        
    });


</script>




<!-- Product section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="my-3">
            <a class="btn btn-outline dark btn-lg" href="{Enviroment.ROOT_URL}/articles">
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
                <h1 class="display-5 fw-bolder">{article.c02}</h1>
                <!--<div class="fs-5 mb-5">
                    <span class="text-decoration-line-through">$45.00</span>
                    <span>$40.00</span>
                </div>-->
                <p class="lead">{article.c03}</p>
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

<!-- Related items section-->
<section class="py-5 bg-light">
    <div class="container px-4 px-lg-5 mt-5">
        {#if isFetching}
            <div class="col mb-5 d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {:else if models.length == 0}
            <h2 class="fw-bolder mb-4">No ads availible</h2>
        {:else}
            <h2 class="fw-bolder mb-4">Current possible ads</h2>
        {/if}
        
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

            {#each models as {c01, c02} ,i}
                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image-->
                        <MyImg id={c01} isArticle={false}/>
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{c02}</h5>

                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="{Enviroment.ROOT_URL}/model/{c01}">View</a></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>



<style>

</style>