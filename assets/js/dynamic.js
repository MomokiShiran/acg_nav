(function($) {
    $(document).ready(function() {
        loadSiteData();
    });

    function loadSiteData() {
        $.ajax({
            url: 'data/sites.json',
            dataType: 'json',
            success: function(data) {
                renderSiteCards(data);
                reInitializeFeatures();
            },
            error: function(error) {
                console.error('加载数据失败:', error);
            }
        });
    }

    function renderSiteCards(data) {
        const container = $('.content-site');
        const categories = data.categories;
        const sites = data.sites;
        
        let htmlContent = '';
        categories.forEach(function(category) {
            const categorySites = sites.filter(function(site) {
                return site.category === category.id;
            });

            if (categorySites.length > 0) {
                htmlContent += generateCategorySection(category, categorySites);
            }
        });

        htmlContent += generateFriendLinks();
        container.html(htmlContent);
    }

    function generateCategorySection(category, sites) {
        let html = '';
        html += '<h4 class="text-gray text-lg mb-4 d-flex flex-fill">';
        html += '<i class="site-tag iconfont icon-tag icon-lg me-1" id="' + category.id + '"></i>';
        html += category.name;
        html += '</h4>';
        html += '<div class="row">';
        
        sites.forEach(function(site) {
            html += generateSiteCard(site);
        });

        html += '</div>';
        return html;
    }

    function generateSiteCard(site) {
        const faviconUrl = 'https://favicon.im/' + (new URL(site.url).hostname);
        const newBadge = site.isNew ? '<span class="badge badge-danger text-ss me-1" title="新">New</span>' : '';
        
        let html = '';
        html += '<div class="url-card col-6 col-sm-6 col-md-4 col-xl-5a col-xxl-6a">';
        html += '<div class="url-body default">';
        html += '<a href="sites/' + site.id + '.html" target="_blank" data-id="' + site.id + '" data-url="' + site.url + '" class="card no-c mb-4 site-' + site.id + '" data-bs-toggle="tooltip" data-bs-placement="bottom" title="' + site.description + '" rel="noopener noreferrer">';
        html += '<div class="card-body">';
        html += '<div class="url-content d-flex align-items-center">';
        html += '<div class="url-img rounded-circle me-2 d-flex align-items-center justify-content-center">';
        html += '<img loading="lazy" src="' + faviconUrl + '" onerror="this.src=\'assets/images/favicon.png\'">';
        html += '</div>';
        html += '<div class="url-info flex-fill">';
        html += '<div class="text-sm overflowClip_1">';
        html += newBadge + '<strong>' + site.name + '</strong>';
        html += '</div>';
        html += '<p class="overflowClip_1 m-0 text-muted text-xs">' + site.description + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</a>';
        html += '<a href="' + site.url + '" class="togo text-center text-muted" target="_blank" data-id="' + site.id + '" data-bs-toggle="tooltip" data-bs-placement="right" title="直达" rel="nofollow" rel="noopener noreferrer"><i class="iconfont icon-goto"></i></a>';
        html += '</div>';
        html += '</div>';
        return html;
    }

    function reInitializeFeatures() {
        if (typeof initTooltips === 'function') {
            if (isPC()) {
                initTooltips();
            } else {
                initTooltips('.qr-img[data-bs-toggle="tooltip"]');
            }
        }
    }

    function generateFriendLinks() {
        return `
        <h4 class="text-gray text-lg mb-4">
            <i class="iconfont icon-book-mark-line icon-lg me-2" id="friendlink"></i>友情链接        </h4>
        <div class="friendlink text-xs card no-hover-card">
            <div class="card-body">
                <a href="https://ciyuan.cat/" title="次元猫导航，一个专注于发现、收录Acg，二次元相关网站的导航网站" target="_blank" rel="noopener noreferrer">次元猫导航</a>
                <a href="https://xiaoyou66.com/" title="二次元技术宅" target="_blank" rel="noopener noreferrer">小游</a>
                <a href="https://msiv.tv/" title="阿瓦隆！遗世独立的理想乡" target="_blank" rel="noopener noreferrer">弥生寺</a>
                <a href="https://www.acgbox.link/">ACG盒子</a>
                <a href="https://www.mgnacg.com/" title="专注动漫的二次元小站">橘子动漫</a>
                <a href="https://www.myiys.com/" title="技术导航-动漫导航-二次元导航">ACGN导航</a>
                <a href="/friends/" target="_blank" title="更多链接" rel="noopener noreferrer">更多链接</a>
            </div>
        </div>
        `;
    }
})(jQuery);
