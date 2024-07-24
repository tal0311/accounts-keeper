<template>
    <article v-if="props.type === 'list'" class="account-preview grid skeleton-loader">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-img"></div>
        <section class="actions-container grid grid-dir-cols">
            <div class="skeleton skeleton-button"></div>
            <div class="skeleton skeleton-button"></div>
        </section>
    </article>

    <div v-if="props.type === 'edit'" class="form-skeleton">
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-label"></div>
        <div class="skeleton skeleton-input"></div>
        <div class="skeleton skeleton-input"></div>
        <div class="skeleton skeleton-label"></div>
        <div class="skeleton skeleton-input"></div>
        <div class="skeleton skeleton-label"></div>
        <div class="skeleton skeleton-input"></div>
        <div class="skeleton skeleton-label"></div>
        <div class="skeleton skeleton-input"></div>
        <div class="skeleton skeleton-table">
            <div class="skeleton skeleton-table-heading"></div>
            <div class="skeleton skeleton-table-heading"></div>
            <div class="skeleton skeleton-table-heading"></div>
            <div class="skeleton skeleton-table-cell"></div>
            <div class="skeleton skeleton-table-cell"></div>
            <div class="skeleton skeleton-table-cell"></div>
        </div>
        <div class="grid grid-dir-cols">
            <div class="skeleton skeleton-button"></div>
            <div class="skeleton skeleton-button"></div>
        </div>
    </div>


</template>


<script setup>

const props = defineProps({
    type: {
        type: String,
        default: 'list'

    }
})

</script>

<style scoped>
.account-preview {
    position: relative;
    grid-template-columns: 0rem auto 0rem;
    outline: 1px solid #ccc;
    padding: 1rem;
}

.account-preview>* {
    grid-column: 2;
}

.account-preview img {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: min-content;
}

.actions-container {
    /* margin-block-end: 1rem; */
    justify-content: end;
    gap: 2rem;
}

.actions-container button,
.actions-container a {
    padding: 0.5rem 1rem;
}

/* Skeleton Loader Styles */

.form-skeleton {
    margin-top: 2rem;
}

.skeleton-loader .skeleton {

    background: #ccc;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
}

.skeleton-title {
    width: 60%;
    height: 1.5rem;
    margin-bottom: 1rem;
}

.skeleton-text {
    width: 60%;
    height: 1rem;
    margin-bottom: 1rem;
}

.skeleton-img {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 1rem;
    top: 1rem;
}

.skeleton-button {
    width: 100px;
    height: 2rem;
}

@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }

    100% {
        background-position: 1000px 0;
    }
}


/* form skeleton */

.form-skeleton {
    display: grid;
    gap: 1rem;
}

.skeleton {
    background: #ccc;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
}

.skeleton-heading {
    height: 2rem;
    width: 30%;
}

.skeleton-label {
    height: 1rem;
    width: 20%;
}

.skeleton-input {
    height: 2rem;
    width: 100%;
}

.skeleton-table {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
}

.skeleton-table-heading {
    height: 1.5rem;
    width: 100%;
}

.skeleton-table-cell {
    height: 2rem;
    width: 100%;
}

.skeleton-button {
    height: 2rem;
    width: 50%;
}

@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }

    100% {
        background-position: 1000px 0;
    }
}
</style>