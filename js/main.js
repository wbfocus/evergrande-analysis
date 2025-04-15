// 主要JavaScript文件，用于网站交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // 返回顶部按钮功能
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        // 初始状态隐藏
        backToTopButton.style.display = 'none';
        
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        // 点击返回顶部
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 侧边栏导航滚动监听
    const contentSections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    if (contentSections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            contentSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 处理时间线页面的交互
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('timeline-item-hover');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('timeline-item-hover');
            });
        });
    }

    // 处理财务数据图表
    const financialCharts = document.querySelectorAll('[id^="financial-chart"]');
    if (financialCharts.length > 0) {
        // 图表配置和数据在各自页面中定义
        console.log('财务图表已初始化');
    }

    // 处理造假手法交互展示
    const fraudMethodItems = document.querySelectorAll('.fraud-method-item');
    if (fraudMethodItems.length > 0) {
        fraudMethodItems.forEach(item => {
            item.addEventListener('click', function() {
                const detailId = this.getAttribute('data-detail');
                const detailElement = document.getElementById(detailId);
                
                if (detailElement) {
                    // 隐藏所有详情
                    document.querySelectorAll('.fraud-method-detail').forEach(el => {
                        el.classList.remove('show');
                    });
                    
                    // 显示当前详情
                    detailElement.classList.add('show');
                    
                    // 滚动到详情区域
                    detailElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 处理监管处罚页面的图表
    const penaltiesChart = document.getElementById('penalties-comparison-chart');
    if (penaltiesChart) {
        // 图表配置和数据在penalties.html页面中定义
        console.log('处罚对比图表已初始化');
    }

    // 处理联系表单验证
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            contactForm.classList.add('was-validated');
        });
    }

    // 处理导航栏在移动设备上的折叠
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // 处理图片查看器
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const imageUrl = this.getAttribute('src');
                const imageAlt = this.getAttribute('alt');
                
                // 创建模态框
                const modal = document.createElement('div');
                modal.className = 'image-viewer-modal';
                modal.innerHTML = `
                    <div class="image-viewer-content">
                        <span class="image-viewer-close">&times;</span>
                        <img src="${imageUrl}" alt="${imageAlt}">
                        <p>${imageAlt}</p>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // 显示模态框
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
                
                // 关闭模态框
                modal.querySelector('.image-viewer-close').addEventListener('click', function() {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                });
                
                // 点击模态框背景关闭
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(modal);
                        }, 300);
                    }
                });
            });
        });
    }

    // 添加数据过滤功能
    const dataFilter = document.getElementById('data-filter');
    const dataItems = document.querySelectorAll('.data-item');
    
    if (dataFilter && dataItems.length > 0) {
        dataFilter.addEventListener('change', function() {
            const filterValue = this.value;
            
            dataItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 添加搜索功能
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            // 模拟搜索结果
            const results = [
                { title: '恒大集团背景', url: 'pages/background.html', relevance: searchTerm.includes('背景') ? 100 : 50 },
                { title: '财务造假时间线', url: 'pages/timeline.html', relevance: searchTerm.includes('时间') ? 100 : 40 },
                { title: '财务数据分析', url: 'pages/financial-analysis.html', relevance: searchTerm.includes('财务') ? 100 : 30 },
                { title: '造假手法剖析', url: 'pages/fraud-methods.html', relevance: searchTerm.includes('手法') ? 100 : 20 },
                { title: '原因分析', url: 'pages/causes.html', relevance: searchTerm.includes('原因') ? 100 : 10 }
            ].filter(item => {
                return item.title.toLowerCase().includes(searchTerm);
            }).sort((a, b) => b.relevance - a.relevance);
            
            if (results.length > 0) {
                let resultsHtml = '<ul class="list-group">';
                results.forEach(result => {
                    resultsHtml += `<li class="list-group-item"><a href="${result.url}">${result.title}</a></li>`;
                });
                resultsHtml += '</ul>';
                
                searchResults.innerHTML = resultsHtml;
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<p class="text-center">没有找到相关结果</p>';
                searchResults.style.display = 'block';
            }
        });
        
        // 点击其他区域关闭搜索结果
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // 添加暗黑模式切换
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        // 检查用户偏好
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedMode = localStorage.getItem('darkMode');
        
        // 初始化暗黑模式状态
        if (savedMode === 'dark' || (savedMode === null && prefersDarkMode)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // 切换暗黑模式
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'light');
            }
        });
    }

    // 添加字体大小调整
    const fontSizeControls = document.querySelectorAll('.font-size-control');
    if (fontSizeControls.length > 0) {
        fontSizeControls.forEach(control => {
            control.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const contentElement = document.querySelector('.content-page');
                
                if (contentElement) {
                    const currentSize = parseInt(window.getComputedStyle(contentElement).fontSize);
                    
                    if (action === 'increase' && currentSize < 20) {
                        contentElement.style.fontSize = (currentSize + 1) + 'px';
                    } else if (action === 'decrease' && currentSize > 14) {
                        contentElement.style.fontSize = (currentSize - 1) + 'px';
                    } else if (action === 'reset') {
                        contentElement.style.fontSize = '16px';
                    }
                }
            });
        });
    }

    // 添加打印功能
    const printButton = document.getElementById('print-page');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // 添加分享功能
    const shareButtons = document.querySelectorAll('.share-button');
    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                
                let shareUrl = '';
                
                switch (platform) {
                    case 'weibo':
                        shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
                        break;
                    case 'wechat':
                        // 显示二维码
                        alert('请使用微信扫一扫功能，扫描网页中的二维码进行分享。');
                        return;
                    case 'qq':
                        shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=500');
                }
            });
        });
    }

    // 添加页面加载进度条
    const progressBar = document.getElementById('page-load-progress');
    if (progressBar) {
        // 模拟页面加载进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.parentElement.style.display = 'none';
                }, 300);
            }
        }, 100);
    }

    console.log('所有交互功能已初始化完成');
});

// 添加自定义图表函数
function createFinancialChart(elementId, labels, datasets, title) {
    const ctx = document.getElementById(elementId).getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 添加时间线动画函数
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('timeline-item-visible');
        }, index * 300);
    });
}

// 添加数据过滤函数
function filterData(category) {
    const dataItems = document.querySelectorAll('.data-item');
    
    dataItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 添加表格排序函数
function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 获取当前排序方向
    const currentDir = table.getAttribute('data-sort-dir') || 'asc';
    const newDir = currentDir === 'asc' ? 'desc' : 'asc';
    
    // 更新表格排序方向
    table.setAttribute('data-sort-dir', newDir);
    
    // 排序行
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // 检查是否为数字
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return newDir === 'asc' ? aNum - bNum : bNum - aNum;
        } else {
            return newDir === 'asc' 
                ? aValue.localeCompare(bValue, 'zh-CN') 
                : bValue.localeCompare(aValue, 'zh-CN');
        }
    });
    
    // 重新添加排序后的行
    rows.forEach(row => tbody.appendChild(row));
}

// 添加响应式表格处理
function handleResponsiveTables() {
    const tables = document.querySelectorAll('.table-responsive table');
    
    tables.forEach(table => {
        if (window.innerWidth < 768) {
            // 为每个单元格添加数据标签
            const headerTexts = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
            
            table.querySelectorAll('tbody tr').forEach(row => {
                Array.from(row.cells).forEach((cell, i) => {
                    if (headerTexts[i]) {
                        cell.setAttribute('data-label', headerTexts[i]);
                    }
                });
            });
        }
    });
}

// 页面加载完成后处理响应式表格
window.addEventListener('load', handleResponsiveTables);
window.addEventListener('resize', handleResponsiveTables);
