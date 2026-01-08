import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click on the 'CURRICULUM' link to navigate to the Courses section.
        frame = context.pages[-1]
        # Click on the CURRICULUM link to go to the Courses section
        elem = frame.locator('xpath=html/body/div/div/header/nav/ul/li[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Check that each course displays detailed information including title, description, duration, and price for the first course (Level 1 Discovery).
        frame = context.pages[-1]
        # Click DETAILS button on Level 1 Discovery course to view detailed information
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div/div[2]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the DETAILS button on the Level 2 Adventure course to verify its detailed information.
        frame = context.pages[-1]
        # Click DETAILS button on Level 2 Adventure course to view detailed information
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div/div[2]/div[2]/div/img').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the DETAILS button on the Level 3 Master course to verify its detailed information.
        frame = context.pages[-1]
        # Click DETAILS button on Level 3 Master course to view detailed information
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div/div[2]/div[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the DETAILS button on the Pro Instructor course to verify its detailed information.
        frame = context.pages[-1]
        # Click DETAILS button on Pro Instructor course to view detailed information
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div/div[2]/div[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Verify interaction on any additional courses or special courses like 'Egypt Deep Week' if applicable, then complete the task.
        frame = context.pages[-1]
        # Click DETAILS button on Egypt Deep Week special course to verify detailed information
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div/div[2]/div[5]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=DISCOVER YOUR POTENTIAL IN THE DEEP BLUE. WE PROVIDE PROFESSIONAL COURSES FROM BEGINNER TO INSTRUCTOR.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=(01) BEGINNER LEVEL 1 DISCOVERY DETAILS →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=(02) AIDA 2 LEVEL 2 ADVENTURE DETAILS →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=(03) AIDA 3 LEVEL 3 MASTER DETAILS →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=(04) PRO INSTRUCTOR DETAILS →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=(05) EGYPT DEEP WEEK').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=이집트 다합 블루홀 등 세계적인 다이빙 스팟에서 진행되는 집중 트레이닝 위크입니다. 전 세계 다이버들과의 교류와 성장이 함께합니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=블루홀 투어링').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=심해 적응 집중 훈련').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=해외 다이빙 매너').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=다국적 다이버 네트워크').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    