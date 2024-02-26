var Jolt = (() => {
    'use strict'

    registerLinks()

    window.addEventListener('popstate', () => swap(location.href, false))

    function swap(href, pushstate) {
        fetch(href)
            .then(r => r.text())
            .then(h => {
                var newDoc = (new DOMParser).parseFromString(h, 'text/html')

                for (const el of newDoc.querySelectorAll('*[j-patch]'))
                    document.getElementById(el.id)?.replaceWith(el)

                if (pushstate) history.pushState({}, '', href)

                registerLinks()
            })
    }

    function registerLinks() {
        for (const el of document.querySelectorAll('*[j-link]'))
            el.onclick = (e) => {
                swap(el.href, true)
                e.preventDefault()
            }
    }
})()