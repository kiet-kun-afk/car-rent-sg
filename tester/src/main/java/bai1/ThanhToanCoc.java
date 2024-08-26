package bai1;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

public class ThanhToanCoc {
	@Test
	public void ThanhToanDC() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "E:\\game\\chromedriver-win64/chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-fullscreen");
        WebDriver driver = new ChromeDriver(options);
    	String url="http://localhost:3000/carrentsg";
    	driver.get(url);
    	
     driver.findElement(By.xpath("//*[@id=\"navbarTogglerDemo03\"]/ul/li[5]/button")).sendKeys(Keys.ENTER);
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"un\"]")).sendKeys("0928199582");
     driver.findElement(By.xpath("//*[@id=\"pw\"]")).sendKeys("Luan76eao@");
     driver.findElement(By.xpath("//*[@id=\"loginWindow\"]/div/div/div/div[2]/div/form/div[5]/button")).sendKeys(Keys.ENTER);
     Thread.sleep(2000);     
     driver.findElement(By.xpath("//*[@id=\"navbarTogglerDemo03\"]/ul/li[5]/div/a[1]")).click();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"root\"]/section/div[1]/div/div/div[1]/div/div[2]/div[2]/a[2]/div")).click();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"root\"]/section/div[1]/div/div/div[2]/div[2]/div[1]/a")).click();
     Thread.sleep(2000);
     JavascriptExecutor js = (JavascriptExecutor) driver;
     js.executeScript("document.body.style.zoom='60%'");
     driver.findElement(By.xpath("//*[@id=\"headingTwo\"]/button")).click();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"e-wallet-momo\"]")).click();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[2]/div/button")).click();
     Thread.sleep(10000);
     driver.findElement(By.xpath("//*[@id=\"card-number\"]")).sendKeys("9704000000000018");
     driver.findElement(By.xpath("//*[@id=\"card-name\"]")).sendKeys("NGUYEN VAN A");
     driver.findElement(By.xpath("//*[@id=\"card-expire\"]")).sendKeys("03/07");
     driver.findElement(By.xpath("//*[@id=\"btn-pay-card\"]")).click();
     Thread.sleep(10000);
     driver.findElement(By.xpath("//*[@id=\"napasOtpCode\"]")).sendKeys("OTP");
     driver.findElement(By.xpath("//*[@id=\"napasProcessBtn1\"]")).click();
     // driver.quit();
    }
	
	
}
