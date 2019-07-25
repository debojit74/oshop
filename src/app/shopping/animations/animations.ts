import {
    trigger,
    transition,
    animate,
    style,
    keyframes,
    animation,
    useAnimation
} from '@angular/animations';

//Fade
export let fadeInanimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
], {
        params: {
            duration: '2s',
            easing: 'ease-in'
        }
    });

export let fade = trigger('fade', [
    transition(':enter', [
        useAnimation(fadeInanimation)
    ])
]);

//Slide
export let bounceInTopAnimation = animation([
    animate('{{ duration }} ease-in', keyframes([
        style({
            offset: .0,
            opacity: 0,
            transform: 'translateY(-100px)'
        }),
        style({
            offset: .2,
            opacity: 0,
            transform: 'translateY(-70px)'
        }),
        style({
            offset: 1,
            opacity: 1,
            transform: 'translateY(0px)'
        })
    ]))], {
        params: {
            duration: '0.4s'
        }
    }
);

export let slide = trigger('slide', [
    transition(':enter', [
        useAnimation(bounceInTopAnimation, {
            params: {
                duration: '0.2s'
            }
        })
    ])
]);