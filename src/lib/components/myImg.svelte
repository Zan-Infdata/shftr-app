<script lang="ts">
    import { ImgController } from '$lib/lib';

    export let isArticle: boolean = false;
    export let id: string = "-1";
    let prefix: string = isArticle ? ImgController.IMG_ART_PFX : "";
    let imgSource: string = ImgController.IMG_LOAD_PATH + prefix + id + ImgController.IMG_EXT;

    function imgError(){
        imgSource = ImgController.IMG_LOAD_PATH + prefix + ImgController.IMG_DUMY + ImgController.IMG_EXT;
    }

</script>


<img class="card-img-top" src={imgSource} alt="..." on:error={imgError}/>
