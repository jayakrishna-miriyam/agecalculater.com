async (page) => {
  const assert = (ok,msg) => { if (!ok) throw new Error(msg); };
  await page.goto('http://127.0.0.1:4174/leap-year-age-calculator');
  await page.setViewportSize({width:320,height:800});
  const theme = page.getByRole('button',{name:'Switch to light mode',exact:true});
  if (await theme.count()) await theme.click();
  const toc = page.getByRole('navigation',{name:'On this page',exact:true});
  await toc.getByRole('link',{name:'The exact convention used on this site',exact:true}).click();
  const table = page.getByRole('table');
  assert(await table.locator('tbody tr').count()===4,'four leap-year examples');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'320px no page overflow');
  const region = page.getByRole('region',{name:"Worked examples using this site's calendar method",exact:true});
  await region.focus();
  await page.keyboard.press('ArrowRight');
  await page.screenshot({path:'output/playwright/content-table-mobile.png'});
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole('button',{name:'Switch to dark mode',exact:true}).click();
  await page.locator('#guide-section-4').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/content-table-desktop-dark.png'});
  await page.goto('http://127.0.0.1:4174/');
  await page.getByRole('link',{name:'Open the 14 May 1992 example',exact:true}).click();
  await page.getByRole('status').getByText('34',{exact:true}).waitFor();
  assert(/34\s+Years\s+6\s+Months\s+6\s+Days/.test(await page.getByRole('status').innerText()),'example link calculates the displayed example');
  return {passed:true,checks:['section navigation','leap-year table','320px overflow','keyboard table access','both themes','reproducible example link']};
}
