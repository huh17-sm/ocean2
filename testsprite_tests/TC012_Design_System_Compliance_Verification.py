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
        # -> Inspect navigation menu links and main headings for CSS class usage and design system adherence.
        frame = context.pages[-1]
        # Click on CURRICULUM link to inspect its UI components for design system adherence.
        elem = frame.locator('xpath=html/body/div/div/header/nav/ul/li[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll down to reveal more course cards and UI components for further inspection of CSS class usage and inline styles.
        await page.mouse.wheel(0, 600)
        

        # -> Verify the usage of CSS classes and design system tokens by inspecting the DOM elements of the course cards and headings directly for class attributes and style attributes.
        frame = context.pages[-1]
        # Click on the first course card LEVEL 1 DISCOVERY to inspect DOM for CSS classes and inline styles.
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div/div[2]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Perform responsive checks on the CURRICULUM section and detailed course card view to ensure consistent styling across screen sizes.
        await page.mouse.wheel(0, 800)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=HOME').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CURRICULUM').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=GALLERY').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CONTACT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Introducing Freediving').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=수영을 못해도 OK! 당신의 두려움이 설렘으로 바뀌는 곳, 오션프리다이빙입니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=From Office to Ocean').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A story of transformation and finding true freedom beneath the surface.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=매일 새벽까지 야근하며 스트레스에 시달리던 평범한 직장인이었습니다. 숨 쉴 틈 없는 일상 속에서, 물속은 유일하게 온전한 나를 마주할 수 있는 공간이었습니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=수영도 못 하고 물을 무서워하던 제가 프리다이빙을 통해 두려움을 극복하고 자유를 찾았습니다. 이제 그 경험을 여러분과 나누고 싶습니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=수영을 못해도, 물이 무서워도 괜찮습니다. 당신의 두려움이 설렘으로 바뀌는 가장 빠른 길을 찾아 드립니다.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=07').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=4.9').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1:3').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Level 1 Discovery').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Level 2 Adventure').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Level 3 Master').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Instructor').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Deep Week').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ready to dive deep with us?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=OCEAN FREEDIVING').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    