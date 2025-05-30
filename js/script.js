document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    const container = document.querySelector('.container');
    const mainContent = document.querySelector('#note-content-area');
    const sidebar = document.querySelector('#notes-sidebar');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    // 立即检查并修复图片
    checkAndFixImages();
    
    setTimeout(() => {
        header.classList.add('loaded');
        container.classList.add('loaded');
        setTimeout(() => {
            sidebar.classList.add('loaded');
            setTimeout(() => {
                mainContent.classList.add('loaded');
                setTimeout(() => {
                    footer.classList.add('loaded');
                    // 页面加载完成后初始化树叶飘落和旋转装饰
                    initFallingLeaves();
                    addRotatingDecoration();
                    addFloatingNotes();
                    
                    // 再次检查图片，确保所有图片都已正确加载
                    checkAndFixImages();
                }, 200);
            }, 200);
        }, 200);
    }, 300);

    // 添加树叶飘落效果
    function initFallingLeaves() {
        // 获取或创建树叶容器
        let leavesContainer = document.querySelector('.falling-leaves-container');
        if (!leavesContainer) {
            leavesContainer = document.createElement('div');
            leavesContainer.className = 'falling-leaves-container';
            document.body.appendChild(leavesContainer);
        }
        
        // 初始生成一些树叶
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createLeaf(leavesContainer), i * 800);
        }
        
        // 定期生成新树叶
        setInterval(() => createLeaf(leavesContainer), 3000);
    }
    
    // 创建单片树叶
    function createLeaf(container) {
        const leaf = document.createElement('div');
        
        // 随机选择树叶类型
        const leafType = Math.random() > 0.5 ? 'leaf-1' : 'leaf-2';
        leaf.className = `leaf ${leafType}`;
        
        // 随机位置和动画持续时间
        const startPos = Math.random() * 100;
        const animDuration = 10 + Math.random() * 15;
        
        leaf.style.left = `${startPos}vw`;
        leaf.style.animationDuration = `${animDuration}s`;
        leaf.style.animationName = 'falling-leaf';
        leaf.style.animationTimingFunction = 'ease-in-out';
        
        // 添加到容器
        container.appendChild(leaf);
        
        // 动画结束后移除树叶
        setTimeout(() => {
            leaf.remove();
        }, animDuration * 1000);
    }
    
    // 添加旋转装饰
    function addRotatingDecoration() {
        // 检查是否已存在旋转装饰元素
        if (!document.querySelector('.rotating-decoration')) {
            const rotatingDecor = document.createElement('div');
            rotatingDecor.className = 'rotating-decoration';
            
            // 添加叶子装饰元素
            const leafDecor = document.createElement('div');
            leafDecor.className = 'leaf-decor';
            rotatingDecor.appendChild(leafDecor);
            
            document.body.appendChild(rotatingDecor);
        }
    }
    
    // 添加浮动笔记元素
    function addFloatingNotes() {
        // 检查是否已存在浮动笔记元素
        if (!document.querySelector('.floating-notes-container')) {
            const floatingNotes = document.createElement('div');
            floatingNotes.className = 'floating-notes-container';
            
            // 添加笔记线条
            const noteLines = document.createElement('div');
            noteLines.className = 'note-lines';
            floatingNotes.appendChild(noteLines);
            
            // 添加笔记装饰
            const noteDecoration = document.createElement('div');
            noteDecoration.className = 'note-decoration';
            floatingNotes.appendChild(noteDecoration);
            
            document.body.appendChild(floatingNotes);
        }
    }

    // 添加鼠标追踪效果
    document.addEventListener('mousemove', (e) => {
        // 计算鼠标在页面的相对位置（百分比）
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        // 设置CSS变量以供样式使用
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}%`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}%`);
        
        // 为旋转元素添加轻微的跟随效果
        const rotatingElements = document.querySelectorAll('.rotating-element');
        rotatingElements.forEach(elem => {
            // 计算元素中心到鼠标的向量
            const rect = elem.getBoundingClientRect();
            const elemX = rect.left + rect.width / 2;
            const elemY = rect.top + rect.height / 2;
            
            // 根据鼠标距离添加微小的变换
            const deltaX = (e.clientX - elemX) / 50;
            const deltaY = (e.clientY - elemY) / 50;
            
            // 应用一点倾斜效果，但保持主要的旋转动画
            elem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    });

    // 为波纹效果添加随机动画偏移
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        const delay = Math.random() * 10;
        const duration = 15 + Math.random() * 15; // 15-30秒
        circle.style.animationDelay = `-${delay}s`;
        circle.style.animationDuration = `${duration}s`;
    });

    // 添加页面闪光效果
    function addPageSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        
        document.body.appendChild(sparkle);
        
        // 动画结束后移除元素
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
    
    // 添加流星效果
    function addShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // 随机起始位置 (总是从屏幕顶部开始)
        const startX = Math.random() * 70;
        star.style.left = `${startX}%`;
        star.style.top = '0';
        
        // 随机大小和速度
        const size = 1 + Math.random() * 3;
        const duration = 0.5 + Math.random() * 1.5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(star);
        
        // 动画结束后移除元素
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }
    
    // 添加元素高亮效果
    function highlightRandomElement() {
        const elements = [
            ...document.querySelectorAll('h1, h2, blockquote, .welcome-illustration-container, .note-illustration-container')
        ];
        
        if (elements.length > 0) {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            randomElement.classList.add('element-highlight');
            
            setTimeout(() => {
                randomElement.classList.remove('element-highlight');
            }, 2000);
        }
    }
    
    // 每隔3-8秒添加一次闪光
    setInterval(() => {
        addPageSparkle();
    }, 3000 + Math.random() * 5000);
    
    // 每隔5-15秒添加一次流星
    setInterval(() => {
        addShootingStar();
    }, 5000 + Math.random() * 10000);
    
    // 每隔8-15秒高亮一个随机元素
    setInterval(() => {
        highlightRandomElement();
    }, 8000 + Math.random() * 7000);
    
    // 为页面元素添加动态阴影效果
    function updateShadows() {
        // 页面主要卡片元素添加呼吸效果
        const time = Date.now() / 1000;
        const shadowOffset = Math.sin(time) * 5;
        const shadowBlur = 10 + Math.sin(time) * 5;
        const shadowOpacity = 0.1 + Math.sin(time) * 0.05;
        
        container.style.boxShadow = `0 ${shadowOffset}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`;
        
        requestAnimationFrame(updateShadows);
    }
    
    updateShadows();

    const notes = [
        {
            id: 1,
            title: '我的第一篇笔记',
            content: `<p>这是我的第一篇笔记的初步内容。我正在尝试建立一个美观的个人笔记展示网站。这个网站将采用<strong>白色和棕色</strong>的主题，希望能带来一种温馨舒适的感觉。</p>
            <hr>
            <p>创建这个网站的过程本身就是一种学习和探索。从最初构思简单的静态页面，到逐步添加交互功能，每一步都充满了挑战和乐趣。选择合适的字体、调整颜色搭配、确保布局在不同设备上都能良好显示，这些细节的打磨构成了整个创作的核心。</p>
            <hr>
            <p>目前，笔记的加载和显示已经基本实现，接下来我会专注于丰富内容和添加更多美术元素，让它不仅仅是一个技术展示，更是一个实用的个人空间。</p>`
        },
        {
            id: 2,
            title: '关于网站主题',
            content: `<p>这个网站的主题是<strong>白色和棕色</strong>。选择这两种颜色并非偶然，它们共同营造了一种既干净又温暖的氛围。</p>
            <hr>
            <ul>
                <li><strong>主背景色 (#FAF7F0 - Soft off-white):</strong> 我选择了柔和的米白色，而不是纯白，以避免过于刺眼，提供更舒适的阅读背景。它代表了洁净、简约和清晰。</li>
                <li><strong>主要文本颜色 (#5D4037 - Dark brown):</strong> 深棕色用于文本，确保了良好的可读性，同时比纯黑色显得更柔和，与整体温暖主题协调。</li>
                <li><strong>标题和强调色 (#4E342E - Slightly darker brown):</strong> 标题使用了更深一度的棕色，增加层次感。</li>
                <li><strong>辅助/边框颜色 (#A1887F, #D7CCC8, #EFEBE9):</strong> 不同深浅的棕色和米色系用于页眉、侧边栏背景、列表项悬停效果和边框，这些色彩的运用旨在增加视觉的丰富性和引导性，同时保持整体的和谐统一。</li>
            </ul>
            <hr>
            <p>我希望这种色彩搭配能够让用户在浏览和阅读笔记时感到放松和愉悦，如同翻阅一本精致的纸质笔记本。</p>`
        },
        {
            id: 3,
            title: '未来计划与展望',
            content: `<p>对于这个笔记网站，我有一些未来的计划和展望，希望能让它变得更加完善和实用：</p>
            <hr>
            <ol>
                <li><strong>丰富笔记内容:</strong> 持续添加更多不同主题的笔记，例如学习心得、旅行日记、技术摘录等，使其成为一个真正个性化的知识库。</li>
                <li><strong>增强美术设计:</strong> 尝试为不同类别的笔记设计独特的图标，或者在笔记内容中适当地插入相关的插图，提升视觉体验。</li>
                <li><strong>优化用户体验:</strong>
                    <ul>
                        <li>引入Markdown支持，让笔记编写更加便捷高效。</li>
                        <li>添加笔记搜索功能，方便快速找到所需信息。</li>
                        <li>考虑实现标签或分类系统，以便更好地组织和管理大量笔记。</li>
                        <li>探索不同的主题配色方案，允许用户自定义。</li>
                    </ul>
                </li>
                <li><strong>技术升级:</strong> 若条件允许，未来可能考虑引入后端支持，实现用户账户、笔记云同步等功能，使其成为一个跨平台的笔记应用。</li>
            </ol>
            <hr>
            <p>虽然目前只是一个简单的前端项目，但我相信通过持续的迭代和改进，它能成为一个令人满意的小工具。</p>`
        },
        {
            id: 4,
            title: '喜爱的食谱收藏',
            content: `<h4>巧克力熔岩蛋糕 (Chocolate Lava Cake)</h4>
            <p>这是一款制作相对简单但效果惊艳的甜点，温热的蛋糕配上流淌的巧克力内心，非常适合冬日的午后或作为晚餐后的特别款待。下面是详细的制作方法：</p>
            <hr>
            <p><strong>份量：</strong> 约2-3个 (取决于模具大小)<br><strong>准备时间：</strong> 15分钟<br><strong>烘烤时间：</strong> 10-12分钟</p>
            <p><strong>原料：</strong></p>
            <ul>
                <li>优质黑巧克力 (至少70%可可含量)：100克 (3.5盎司)</li>
                <li>无盐黄油：100克 (3.5盎司)，另加少许用于涂抹模具</li>
                <li>鸡蛋：2个 (室温)</li>
                <li>蛋黄：2个 (室温)</li>
                <li>细砂糖：60克 (约1/4杯)</li>
                <li>低筋面粉或中筋面粉：30克 (约1/4杯)，另加少许用于模具撒粉</li>
                <li>盐：一小撮</li>
                <li>香草精：几滴 (可选)</li>
                <li>糖粉：用于装饰 (可选)</li>
            </ul>
            <hr>
            <p><strong>所需工具：</strong></p>
            <ul>
                <li>几个小号烤碗或舒芙蕾模具 (ramekins)</li>
                <li>打蛋器</li>
                <li>橡皮刮刀</li>
                <li>面粉筛</li>
            </ul>
            <hr>
            <p><strong>制作步骤：</strong></p>
            <ol>
                <li><strong>准备工作：</strong> 预热烤箱至200°C (400°F)。用黄油仔细涂抹烤碗内部，然后均匀撒上一层薄薄的面粉，抖掉多余的面粉。这样做可以防止蛋糕粘连，方便脱模。</li>
                <li><strong>融化巧克力和黄油：</strong> 将黑巧克力切碎，与黄油一起放入一个耐热碗中。通过隔水加热的方式（将碗放在一个盛有少量热水的小锅上，注意碗底不要接触到水）或者用微波炉分多次短时加热（每次20-30秒，取出搅拌）融化巧克力和黄油，搅拌至顺滑无颗粒。完成后移开热源，稍微放凉。</li>
                <li><strong>打发鸡蛋：</strong> 在另一个碗中，将鸡蛋、蛋黄、细砂糖和盐混合。用打蛋器搅打，直到混合物颜色变浅，体积略微膨胀，呈现浓稠状态。不需要打发到像制作海绵蛋糕那样硬挺。</li>
                <li><strong>混合巧克力与蛋糊：</strong> 将稍微冷却的巧克力黄油液分两到三次倒入打发好的鸡蛋糊中，每次加入后都用橡皮刮刀从底部向上轻轻翻拌均匀。注意不要过度搅拌，以免面糊产生过多气泡。</li>
                <li><strong>加入面粉：</strong> 将面粉筛入混合好的巧克力蛋糊中，继续用刮刀轻轻翻拌均匀，直到看不见干粉即可。如果使用香草精，此时可以加入并拌匀。</li>
                <li><strong>填充模具：</strong> 将制作好的蛋糕糊均匀地分配到准备好的烤碗中，约填充至模具的六七分满。</li>
                <li><strong>烘烤：</strong> 将烤碗放入预热好的烤箱中层，烘烤10-12分钟。确切时间取决于烤箱性能和模具大小。蛋糕的边缘应该已经凝固成型，但中心部分触摸时仍感觉柔软，并且轻轻晃动时会有晃动感。这是熔岩效果的关键。</li>
                <li><strong>脱模与享用：</strong> 烤好后，小心地从烤箱中取出烤碗。让蛋糕在模具中静置1-2分钟。然后，用小刀沿着蛋糕边缘轻轻划一圈，将一个盘子倒扣在烤碗上，然后迅速翻转过来，轻轻提起烤碗。如果准备工作做得好，蛋糕应该能顺利脱模。</li>
                <li><strong>装饰：</strong> 可以在温热的熔岩蛋糕上撒上少许糖粉，或搭配一小勺香草冰淇淋、新鲜莓果一起享用。</li>
            </ol>
            <hr>
            <p><strong>小贴士：</strong></p>
            <ul>
                <li>使用高质量的黑巧克力是成功的关键，它直接影响蛋糕的风味。</li>
                <li>烘烤时间非常重要，宁可略微欠烤一点（内心更流淌），也不要烤过头（内心会凝固）。可以先烤一个测试一下最佳时间。</li>
                <li>熔岩蛋糕最好趁热食用，才能体验到爆浆的乐趣。</li>
            </ul>`
        },
        {
            id: 5,
            title: '高效笔记技巧',
            content: `<p>记笔记不仅仅是简单地记录文字，更是一种主动学习和信息管理的过程。以下是一些实用技巧，可以帮助你更有效地记笔记：</p>
            <hr>
            <ul>
                <li><strong>明确目的，抓住重点：</strong> 在开始记录之前，思考你为什么需要这份笔记，希望从中获得什么。这将帮助你筛选信息，只记录最核心和相关的内容。避免逐字逐句抄写，尝试用自己的话总结。</li>
                <li><strong>使用关键词和短语：</strong> 用简洁的关键词和短语代替冗长的句子，这样不仅记录速度快，复习时也能迅速回忆起主要内容。</li>
                <li><strong>结构化笔记：</strong> 使用标题、副标题、项目符号 (•) 和编号列表 (1, 2, 3) 来组织信息，使其层次分明，易于阅读和理解。例如，康奈尔笔记法就是一种经典的结构化笔记方法。</li>
                <li><strong>善用缩写和符号：</strong> 为常用词汇或概念创建自己的一套缩写和符号，可以大大提高记录效率。例如，用 "&" 代表 "和"，用 "->" 代表 "导致" 或 "结果是"。</li>
            </ul>
            <hr>
            <ul>
                <li><strong>视觉辅助 (如果可能)：</strong> 虽然本网站目前主要支持文本，但在纸质笔记或支持富文本的编辑器中，可以适当使用图表、流程图、思维导图、高亮和不同颜色的笔来强调重点和梳理逻辑关系。视觉元素能帮助大脑更好地处理和记忆信息。</li>
                <li><strong>定期回顾和整理：</strong> 笔记的价值在于使用。定期回顾你的笔记，不仅能巩固记忆，还能发现新的联系和理解。同时，定期整理和归档笔记，确保它们易于查找。</li>
                <li><strong>保持一致性：</strong> 无论是格式、符号使用还是组织方式，尽量保持一致性，这样你的笔记系统才会更有效率。</li>
                <li><strong>实践与调整：</strong> 没有一种笔记方法适合所有人。尝试不同的技巧，找到最适合你学习风格和需求的方法，并根据实际情况不断调整和优化。</li>
            </ul>
            <hr>
            <p>通过刻意练习这些技巧，你的笔记将不再是信息的简单堆砌，而是强大的学习和思考工具。</p>`
        }
    ];

    // 添加装饰性元素
    function addDecorativeElements() {
        // 添加随机浮动的背景装饰
        const decorContainer = document.createElement('div');
        decorContainer.className = 'background-decorations';
        document.body.appendChild(decorContainer);
        
        for (let i = 0; i < 5; i++) {
            const decor = document.createElement('div');
            decor.className = 'floating-decor';
            decor.style.top = Math.random() * 100 + 'vh';
            decor.style.left = Math.random() * 100 + 'vw';
            decor.style.animationDelay = Math.random() * 5 + 's';
            decor.style.animationDuration = (Math.random() * 10 + 10) + 's';
            decor.innerHTML = ['✦', '❋', '✾', '❃', '✿'][Math.floor(Math.random() * 5)];
            decorContainer.appendChild(decor);
        }
        
        // 添加页面滚动时的动态效果
        window.addEventListener('scroll', () => {
            // 获取滚动百分比
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollTop / scrollHeight;
            
            // 根据滚动位置调整页面元素
            const rotatingElement = document.querySelector('.rotating-element');
            if (rotatingElement) {
                // 根据滚动位置调整旋转速度
                const rotationSpeed = 10 + scrollPercent * 5; // 10-15秒
                rotatingElement.style.animationDuration = `${rotationSpeed}s`;
            }
        });
    }
    
    // 添加交互效果
    function setupInteractions() {
        // 为标题添加点击动画
        const titles = document.querySelectorAll('h1, h2');
        titles.forEach(title => {
            title.addEventListener('click', (e) => {
                e.target.classList.add('pulse');
                setTimeout(() => {
                    e.target.classList.remove('pulse');
                }, 1000);
            });
        });
        
        // 为引用块添加自动动画
        const quotes = document.querySelectorAll('.quote-container');
        if(quotes.length > 0) {
            setInterval(() => {
                quotes.forEach(quote => {
                    quote.classList.add('highlight');
                    setTimeout(() => {
                        quote.classList.remove('highlight');
                    }, 1500);
                });
            }, 10000);  // 每10秒高亮一次
        }
    }

    const notesListElement = document.getElementById('notes-list');
    const currentNoteArticleElement = document.getElementById('current-note');
    const welcomeMessage = `
        <h2><i class="fas fa-crown"></i> 欢迎</h2>
        <hr class="decorative-divider">
        <div class="welcome-illustration-container">
            <img src="./images/new_welcome_illustration.png" alt="温馨书房插图" id="welcome-image" loading="lazy" onerror="this.onerror=null;this.src='./images/welcome_illustration.png';">
            <div class="image-decoration top-left"></div>
            <div class="image-decoration top-right"></div>
            <div class="image-decoration bottom-left"></div>
            <div class="image-decoration bottom-right"></div>
        </div>
        <p>请从左侧选择一篇笔记进行阅读，或者稍后我会为您填充一些示例笔记。</p>
        <hr class="decorative-divider">
        <div class="quote-container">
            <blockquote>
                <p><i class="fas fa-quote-left"></i> 知识是一座宝库，而实践是开启它的钥匙。 <i class="fas fa-quote-right"></i></p>
                <cite>— 托马斯·富勒</cite>
            </blockquote>
        </div>
    `;

    function renderNoteList() {
        notesListElement.innerHTML = ''; // Clear existing list
        notes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = note.title;
            listItem.dataset.id = note.id;
            // 添加延迟动画
            listItem.style.animationDelay = `${index * 0.1}s`;
            notesListElement.appendChild(listItem);
        });
    }

    // 修改笔记中的图片路径
    function fixNoteImagePaths(noteContent) {
        if (!noteContent) return noteContent;
        
        // 添加 ./ 前缀到所有图片路径
        return noteContent.replace(/src="images\//g, 'src="./images/');
    }

    function renderNoteContent(noteId) {
        // 添加淡出动画
        const currentNoteArticleElement = document.getElementById('current-note');
        currentNoteArticleElement.classList.add('fade-out');
        
        setTimeout(() => {
            const note = notes.find(n => n.id === parseInt(noteId));
            if (note) {
                // 修复图片路径
                const fixedContent = fixNoteImagePaths(note.content);
                
                currentNoteArticleElement.innerHTML = `
                    <h2><i class="fas fa-file-alt"></i> ${note.title}</h2>
                    <hr class="decorative-divider">
                    <div>${fixedContent}</div>
                `;
            } else {
                currentNoteArticleElement.innerHTML = welcomeMessage;
            }

            // 更新侧边栏活动项
            const notesListElement = document.getElementById('notes-list');
            Array.from(notesListElement.children).forEach(li => {
                if (li.dataset.id === noteId) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            });
            
            // 添加淡入动画
            currentNoteArticleElement.classList.remove('fade-out');
            currentNoteArticleElement.classList.add('fade-in');
            
            // 检查并修复图片
            setTimeout(() => {
                currentNoteArticleElement.classList.remove('fade-in');
                checkAndFixImages(); // 检查新加载的图片
                setupInteractions(); // 重新设置交互效果
            }, 500);
        }, 300);
    }

    notesListElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const noteId = event.target.dataset.id;
            renderNoteContent(noteId);
        }
    });

    // 初始化
    renderNoteList();
    addDecorativeElements();
    setupInteractions();
    
    // 如果存在笔记，显示第一篇
    if (notes.length > 0) {
        renderNoteContent(notes[0].id.toString());
    }

    // 修正图片加载问题
    function checkAndFixImages() {
        console.log('Checking and fixing images...');
        
        // 检查所有图片
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            const originalSrc = img.getAttribute('src');
            console.log('Checking image:', originalSrc);
            
            // 为所有图片添加错误处理
            img.onerror = function() {
                console.error('Image failed to load:', this.src);
                
                // 尝试不同的修复策略
                if (!this.hasAttribute('data-fix-attempted')) {
                    this.setAttribute('data-fix-attempted', 'true');
                    
                    // 策略1: 添加./前缀
                    if (!this.src.startsWith('./') && !this.src.startsWith('http')) {
                        console.log('Trying with ./ prefix');
                        this.src = './' + this.src;
                        return;
                    }
                    
                    // 策略2: 移除./前缀
                    if (this.src.startsWith('./')) {
                        console.log('Trying without ./ prefix');
                        this.src = this.src.substring(2);
                        return;
                    }
                    
                    // 策略3: 尝试替代图片
                    if (this.id === 'welcome-image') {
                        if (this.src.includes('new_welcome_illustration.png')) {
                            console.log('Trying welcome_illustration.png');
                            this.src = this.src.replace('new_welcome_illustration.png', 'welcome_illustration.png');
                        } else {
                            console.log('Trying new_welcome_illustration.png');
                            this.src = this.src.replace('welcome_illustration.png', 'new_welcome_illustration.png');
                        }
                        return;
                    }
                    
                    // 如果所有策略都失败，显示占位符
                    this.style.display = 'none';
                    this.classList.add('loading-error');
                    
                    // 添加占位符
                    if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('image-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'image-placeholder';
                        placeholder.textContent = '图片加载失败';
                        this.parentNode.appendChild(placeholder);
                    }
                }
            };
            
            // 触发一次加载检查
            if (originalSrc) {
                const tempSrc = img.src;
                img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                setTimeout(() => { img.src = tempSrc; }, 10);
            }
        });
        
        // 检查CSS背景图片
        const elementsWithBackgroundImage = [
            '.rotating-decoration',
            '.floating-notes-container',
            '.leaf-1',
            '.leaf-2',
            'body',
            'header',
            '.container::before'
        ];
        
        elementsWithBackgroundImage.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    // 为这些元素添加一个特殊的类，用于CSS调试
                    element.classList.add('bg-image-checked');
                });
            } catch (e) {
                console.error('Error checking background image for', selector, e);
            }
        });
    }

    // 函数调用
    checkAndFixImages();
});
