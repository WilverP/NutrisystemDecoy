// eslint-disable-next-line no-undef
$(document).ready(() => {
    if (typeof window.Laravel !== 'undefined' && typeof window.Laravel.text_elements !== 'undefined') {
        // NAR-2896 - Complete Plan ALC changes - Starts
        if (typeof window.Laravel.cart.prepayType !== 'undefined'
        && window.Laravel.cart.prepayType === 'pre6pay') {
            const source = Array.from(document.getElementsByClassName('footer-sub-links'));
            source.forEach((item) => {
                if (item.innerHTML.indexOf('A La Carte') > -1) item.innerHTML = '';
            });
        }
        // NAR-2896 - Complete Plan ALC changes - Ends
    }

    if(typeof window.Laravel !== 'undefined' && typeof window.Laravel.individual !== 'undefined' &&  window.Laravel.individual){
        var addressId = '';

        if (typeof window.Laravel.individual.subscriptions !== 'undefined' && window.Laravel.individual.subscriptions != null) {
            for (var i = 0; i < window.Laravel.individual.subscriptions.length; i++) {
                if (window.Laravel.individual.subscriptions[i].state == 'ACTIVE') {
                    addressId =window.Laravel.individual.subscriptions[i].templateOrder.shipping_address.address_id;
                    break;
                }
            }
        }
       /* var $shippingLink = $("#updateShippingLink");
        if($shippingLink.length > 0) {
            $shippingLink.attr("href", "/account/update-shipping/" + addressId);
        }*/
    }
});
