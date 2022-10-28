$(document).ready(function () {

    if ($("#search-alacarte").length > 0) {
        let url = '/products/search-options';

        $("#search-alacarte").html('Loading...');

        setTimeout(function () {
            $("#search-alacarte").html('');
            $("#search-alacarte").show();
            var select = $('<select class="js-search-ajax form-control"></select>');
            if (Laravel.searchterm) {
                var option = $('<option selected>' + Laravel.searchterm + '</option>');
                select.append(option);
            }
            $("#search-alacarte").append(select);
            $("#search-alacarte").append('<span class="glyphicon glyphicon-search"></span>');
            $('.js-search-ajax').select2({
                // tags: true,
                ajax: {
                    url: url,
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            term: params.term,
                            type: 'public'
                        }
                        return query;
                    },
                    processResults: function (data) {
                        return {
                            results: data
                        };
                    },

                },
                templateSelection: onSelection,
                placeholder: 'Search for a product',
                minimumInputLength: 3,
            });
            /*$(".js-search-ajax").on('change', function (e) {
                console.log($(this).val());
                var val = $(this).val();
                if(val) {
                    window.location = '/products/search?term=' + val;
                }
            })*/
        }, 1);

        function onSelection(option) {
            if (!option.id) {
                return option.text;
            }

            switch (option.type) {
                case 'category':
                    window.location = option.url;
                    return;
                case 'item':
                    window.location = option.url;
                    return;
            }

            return option.text;
        };

    }
});
