<script lang="ts">

    import { Enviroment, PageLoader } from '$lib/lib.js';
    import Loader from '$lib/components/loader.svelte';
    import MyImg from '$lib/components/myImg.svelte';
    import { onMount } from 'svelte';

    export let form;

    let filter: string = "";

    $: isFetching = form == null;

    $: articles = form == null ? [] : form.res.DATA;


    onMount(() =>{
        
        const fd = new FormData();
        fd.append("filter", "");

        const url = `${Enviroment.ROOT_URL}/artall?/loadData`;

        PageLoader.fetchData(fd, url);
        
    });

</script>


<!-- Header-->
<header class="bg-dark py-5">
    <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">Shapeshifter</h1>
            <p class="lead fw-normal text-white-50 mb-0">Browse our All of our Articles</p>
        </div>
    </div>
</header>



<!-- Section-->
<section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row justify-content-end">
            <div class="col-md-4">
                <div class="form-outline form-white">
                    <input bind:value={filter} type="text" placeholder="Start typing to filter..." class="form-control"  />
                </div>
            </div>
        </div>
        <hr/>
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center mt-5">
            {#if isFetching}
                <Loader/>
            {:else}

                
            {#each articles as {c01 , c02, c06}, i }
                {#if c02.toLowerCase().includes(filter.toLowerCase())}
                <div class="col mb-5">
                    <div class="card h-100">

                        {#if c06}
                            <div class="badge rounded-pill bg-success position-absolute" style="top: 0.5rem; right: 0.5rem">Active</div>
                        {:else}
                            <div class="badge rounded-pill bg-danger position-absolute" style="top: 0.5rem; right: 0.5rem">Unactive</div>
                        {/if}
                        
                        <!-- Product image-->
                        <MyImg id={c01} isArticle={true}/>
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">{c02}</h5>
                                <!-- Product reviews
                                <div class="d-flex justify-content-center small text-warning mb-2">
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                </div>-->
                                <!-- Product price
                                <span class="text-muted text-decoration-line-through">$20.00</span>
                                $18.00-->
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="{Enviroment.ROOT_URL}/artedit/{c01}">Edit</a></div>
                        </div>
                    </div>
                </div>
                {/if}
            {/each}

            {/if}
        </div>
    </div>
</section>