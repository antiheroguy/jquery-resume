import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'
import Isotope from 'isotope-layout'
import 'owl.carousel'

$(document).ready(function () {
  $(window).on("load", function () {
    const container = new Isotope(document.getElementById('posts'), {
      itemSelector: '.item',
      layoutMode: 'fitRows',
    })

    $('#preloader').fadeOut('slow', function () {
      $(this).remove()
    })

    $('#vcard-area').tabs({
      active: 0
    })

    $('#tech').click(function () {
      container.arrange({ filter: '*' })
    })

    $('#filters').on('click', 'button', function () {
      container.arrange({ filter: $(this).attr('data-filter') })
    })

    $('.tab-button').on("click", function () {
      $('.tab-button.active').removeClass('active')
      $(this).addClass('active')
    })

    $('.blog-content').owlCarousel({
      responsiveClass: true,
      margin: 10,
      navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i'],
      dotsSpeed: 2000,
      navSpeed: 2000,
      nav: true,
      smartSpeed: 2000,
      responsive: {
        0: { items: 1 },
        400: { items: 1 },
        600: { items: 1 },
        700: { items: 2 },
        1000: { items: 2 }
      }
    })
  })
})