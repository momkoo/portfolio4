import { chromium } from 'playwright';

async function testWebsite() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const errors = [];
    const warnings = [];
    
    // 콘솔 메시지 수집
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        } else if (msg.type() === 'warning') {
            warnings.push(msg.text());
        }
    });
    
    // 페이지 에러 수집
    page.on('pageerror', error => {
        errors.push(error.message);
    });
    
    try {
        console.log('🌸 Elegance Wedding 웹사이트 테스트 시작...\n');
        
        // 페이지 로드
        await page.goto(`file:///workspace/index.html`, { waitUntil: 'networkidle' });
        console.log('✓ 페이지 로드 완료');
        
        // 기본 요소 확인
        const navbar = await page.$('.navbar');
        console.log(navbar ? '✓ 네비게이션 바 확인' : '✗ 네비게이션 바 없음');
        
        const hero = await page.$('.hero');
        console.log(hero ? '✓ 히어로 섹션 확인' : '✗ 히어로 섹션 없음');
        
        const waveGallery = await page.$('#waveGallery');
        console.log(waveGallery ? '✓ 파도 갤러리 확인' : '✗ 파도 갤러리 없음');
        
        const galleryItems = await page.$$('.gallery-item');
        console.log(`✓ 갤러리 아이템: ${galleryItems.length}개 확인`);
        
        // Portfolio 섹션 확인
        const portfolio = await page.$('#portfolio');
        console.log(portfolio ? '✓ 포트폴리오 섹션 확인' : '✗ 포트폴리오 섹션 없음');
        
        // About 섹션 확인
        const about = await page.$('#about');
        console.log(about ? '✓ About 섹션 확인' : '✗ About 섹션 없음');
        
        // Reviews 섹션 확인
        const reviews = await page.$('#reviews');
        console.log(reviews ? '✓ Reviews 섹션 확인' : '✗ Reviews 섹션 없음');
        
        // Contact 섹션 확인
        const contact = await page.$('#contact');
        console.log(contact ? '✓ Contact 섹션 확인' : '✗ Contact 섹션 없음');
        
        // 파도 갤러리 호버 테스트
        if (galleryItems.length > 0) {
            const firstItem = galleryItems[0];
            await firstItem.hover();
            await page.waitForTimeout(500);
            console.log('✓ 파도 갤러리 호버 테스트 완료');
        }
        
        // 스크롤 테스트
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(300);
        console.log('✓ 스크롤 테스트 완료');
        
        // 에러 및 경고 확인
        console.log('\n--- 콘솔 에러 및 경고 ---');
        if (errors.length === 0) {
            console.log('✓ 콘솔 에러 없음');
        } else {
            console.log(`✗ 콘솔 에러 (${errors.length}개):`);
            errors.forEach(err => console.log(`  - ${err}`));
        }
        
        if (warnings.length > 0) {
            console.log(`⚠ 경고 (${warnings.length}개):`);
            warnings.forEach(warn => console.log(`  - ${warn}`));
        }
        
        // 최종 결과
        console.log('\n========================================');
        if (errors.length === 0) {
            console.log('🎉 모든 테스트 통과! 웹사이트가 정상 작동합니다.');
        } else {
            console.log(`⚠ ${errors.length}개의 에러가 발견되었습니다.`);
        }
        console.log('========================================\n');
        
    } catch (error) {
        console.error('❌ 테스트 실패:', error.message);
    } finally {
        await browser.close();
    }
}

testWebsite();
