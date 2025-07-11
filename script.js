// Обновленная функция для бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('nav ul');
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    menuOverlay.addEventListener('click', closeMenu);
    
    // Закрытие меню при клике на ссылки
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Добавляем небольшую задержку для плавности
            setTimeout(closeMenu, 300);
        });
    });
    
    function closeMenu() {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your inquiry! Our specialist will contact you shortly.');
            contactForm.reset();
        });
    }
});

// Полностью перерабатываем код графиков
document.addEventListener('DOMContentLoaded', function() {
    // Функция для обработки CSV данных
    function processData(csv) {
        const lines = csv.split('\n');
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i]) continue;
            const parts = lines[i].split(',');
            if (parts.length < 2) continue;
            
            // Извлекаем год и квартал из даты
            const dateParts = parts[0].split('-');
            const year = parseInt(dateParts[0]);
            const quarter = Math.floor((parseInt(dateParts[1]) - 1) / 3) + 1;
            const label = `Q${quarter} ${year}`;
            
            result.push({
                label: label,
                value: parseFloat(parts[1])
            });
        }
        
        return result;
    }

    // Создаем график с правильными данными
    function createChart(canvasId, data, color) {
        const labels = data.map(item => item.label);
        const values = data.map(item => item.value);
        
        new Chart(document.getElementById(canvasId), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price Index',
                    data: values,
                    borderColor: color,
                    backgroundColor: color + '20',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointBackgroundColor: color
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Index: ${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Данные для Флориды (взяты из CSV)
    const floridaData = processData(`observation_date,FLSTHPI
2015-01-01,335.99
2015-04-01,344.12
2015-07-01,352.71
2015-10-01,359.57
2016-01-01,366.33
2016-04-01,375.61
2016-07-01,385.92
2016-10-01,392.31
2017-01-01,399.43
2017-04-01,409.25
2017-07-01,416.49
2017-10-01,424.58
2018-01-01,433.05
2018-04-01,441.41
2018-07-01,448.87
2018-10-01,452.31
2019-01-01,459.33
2019-04-01,465.31
2019-07-01,472.96
2019-10-01,479.04
2020-01-01,486.33
2020-04-01,492.60
2020-07-01,501.17
2020-10-01,514.55
2021-01-01,531.29
2021-04-01,566.07
2021-07-01,607.86
2021-10-01,642.13
2022-01-01,678.35
2022-04-01,733.44
2022-07-01,762.56
2022-10-01,760.44
2023-01-01,763.97
2023-04-01,780.58
2023-07-01,798.60
2023-10-01,801.17
2024-01-01,809.94
2024-04-01,818.02
2024-07-01,822.21
2024-10-01,830.88
2025-01-01,820.29`);

    // Данные для Аризоны
    const arizonaData = processData(`observation_date,AZSTHPI
2015-01-01,309.77
2015-04-01,316.41
2015-07-01,322.81
2015-10-01,327.27
2016-01-01,331.13
2016-04-01,338.04
2016-07-01,343.77
2016-10-01,349.21
2017-01-01,354.34
2017-04-01,363.49
2017-07-01,371.11
2017-10-01,375.47
2018-01-01,383.27
2018-04-01,391.38
2018-07-01,400.35
2018-10-01,405.04
2019-01-01,410.19
2019-04-01,418.38
2019-07-01,424.64
2019-10-01,431.97
2020-01-01,440.63
2020-04-01,448.37
2020-07-01,459.27
2020-10-01,475.53
2021-01-01,496.68
2021-04-01,536.29
2021-07-01,580.78
2021-10-01,610.26
2022-01-01,639.62
2022-04-01,687.46
2022-07-01,696.77
2022-10-01,672.21
2023-01-01,666.91
2023-04-01,678.41
2023-07-01,693.39
2023-10-01,700.09
2024-01-01,703.98
2024-04-01,716.86
2024-07-01,723.47
2024-10-01,722.92
2025-01-01,722.65`);

    // Данные для США
    const usData = processData(`observation_date,USSTHPI
2015-01-01,348.78
2015-04-01,354.43
2015-07-01,359.45
2015-10-01,362.33
2016-01-01,365.67
2016-04-01,372.48
2016-07-01,379.14
2016-10-01,382.07
2017-01-01,384.77
2017-04-01,393.37
2017-07-01,399.44
2017-10-01,402.75
2018-01-01,408.41
2018-04-01,415.90
2018-07-01,420.99
2018-10-01,422.42
2019-01-01,427.16
2019-04-01,434.30
2019-07-01,439.83
2019-10-01,443.75
2020-01-01,448.89
2020-04-01,453.41
2020-07-01,461.39
2020-10-01,471.51
2021-01-01,482.93
2021-04-01,509.74
2021-07-01,538.13
2021-10-01,556.58
2022-01-01,576.94
2022-04-01,614.56
2022-07-01,624.40
2022-10-01,618.49
2023-01-01,622.13
2023-04-01,640.75
2023-07-01,652.13
2023-10-01,653.93
2024-01-01,662.70
2024-04-01,679.36
2024-07-01,686.41
2024-10-01,689.54
2025-01-01,693.76`);

    // Создаем графики с правильными цветами
    createChart('floridaChart', floridaData, '#0077b6');
    createChart('arizonaChart', arizonaData, '#ff7f50');
    createChart('usChart', usData, '#6c757d');
});