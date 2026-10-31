(() => {
    const viewportMargin = 16;

    function positionZoom(link) {
        // Measure the unchanged thumbnail slot, not the transformed image.
        const rect = link.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const requestedScale = parseFloat(getComputedStyle(link).getPropertyValue('--teaser-scale')) || 1;
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight;
        const scale = Math.min(
            requestedScale,
            Math.max(1, viewportWidth - 2 * viewportMargin) / rect.width,
            Math.max(1, viewportHeight - 2 * viewportMargin) / rect.height
        );

        // Keep the usual top-left position until a viewport edge requires a shift.
        const left = Math.max(viewportMargin, Math.min(rect.left, viewportWidth - viewportMargin - rect.width * scale));
        const top = Math.max(viewportMargin, Math.min(rect.top, viewportHeight - viewportMargin - rect.height * scale));

        link.style.setProperty('--teaser-zoom', scale);
        link.style.setProperty('--teaser-offset-x', `${left - rect.left}px`);
        link.style.setProperty('--teaser-offset-y', `${top - rect.top}px`);
    }

    function initialize() {
        document.querySelectorAll('.publication-teaser').forEach((link) => {
            link.addEventListener('pointerenter', () => positionZoom(link));
            link.addEventListener('focus', () => positionZoom(link));
            link.querySelector('img')?.addEventListener('load', () => positionZoom(link));
        });

        let updatePending = false;
        function updateActiveZooms() {
            if (updatePending) return;
            updatePending = true;
            requestAnimationFrame(() => {
                document.querySelectorAll('.publication-teaser:hover, .publication-teaser:focus-visible').forEach(positionZoom);
                updatePending = false;
            });
        }

        window.addEventListener('resize', updateActiveZooms);
        window.addEventListener('scroll', updateActiveZooms, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();
