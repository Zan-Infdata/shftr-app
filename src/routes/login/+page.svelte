<script lang="ts">
    import { Enviroment } from "$lib/lib";
    import type { ActionData } from "./$types";


    export let form: ActionData;



</script>
  


<body>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-header">
                            <a class="btn btn-dark btn-lg" href="{Enviroment.ROOT_URL+Enviroment.DEFAULT_PUBLIC_PAGE}">
                                <i class="bi bi-arrow-left" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <h2 class="fw-bold mb-2 text-uppercase">Shapeshifter</h2>
                                <p class="text-white-50 mb-5">Login</p>

                                <form action="?/login" method="POST">
                                    <div class="form-outline form-white mb-4">
                                        <input type="text" id="username" name="username" class="form-control form-control-lg"  />
                                        <label class="form-label" for="username">Username</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" id="password" name="password" class="form-control form-control-lg" />
                                        <label class="form-label" for="password">Password</label>
                                    </div>
                                    
                                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                    
                                    
                                </form>

                                {#if form?.err}
                                    <p class="badge rounded-pill bg-danger mt-4">{form.message}</p>
                                {/if}


                            <!--<div class="d-flex justify-content-center text-center mt-4 pt-1">
                                <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                                <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                            </div>-->

                            </div>

                            <!-- <div>
                            <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                            </p>
                            </div> -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

  

<style>
.gradient-custom {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>