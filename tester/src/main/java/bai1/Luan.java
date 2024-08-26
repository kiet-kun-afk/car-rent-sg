package bai1;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class Luan {
	@Test
	public void Luan1() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "E:\\game\\chromedriver-win64/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
    	String url="http://localhost:3000/admin/login";
    	driver.get(url);
    	
     driver.findElement(By.xpath("//*[@id=\"username\"]")).sendKeys("kietmnvps27065@fpt.edu.vn");
     driver.findElement(By.xpath("//*[@id=\"password\"]")).sendKeys("P@s$w0rD");
     driver.findElement(By.xpath("//*[@id=\"login-submit\"]")).sendKeys(Keys.ENTER);
     // driver.quit();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"sidebar\"]/ul[1]/li[4]/a")).click();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"content\"]/main/div[2]/div/div[2]/table/tbody/tr[64]/td[16]/button[1]")).click();
     Thread.sleep(3000);
     JavascriptExecutor js = (JavascriptExecutor) driver;
     js.executeScript("document.body.style.zoom='60%'");
     Thread.sleep(3000);
     driver.findElement(By.xpath("//*[@id=\"chitietHD\"]/div/div/div[3]/div/button")).click();
     Thread.sleep(3000);
    driver.findElement(By.xpath("//*[@id=\"closebtn\"]")).click();
    Thread.sleep(3000);
     
     
    }
}
