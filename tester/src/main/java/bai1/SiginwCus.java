package bai1;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class SiginwCus {
	@Test
	public void SiginwithCus() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "E:\\game\\chromedriver-win64/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
    	String url="http://localhost:3000/carrentsg";
    	driver.get(url);
     driver.findElement(By.xpath("//*[@id=\"navbarTogglerDemo03\"]/ul/li[3]/a")).sendKeys(Keys.ENTER);
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"sdt\"]")).sendKeys("0928199583");
     driver.findElement(By.xpath("//*[@id=\"email\"]")).sendKeys("nuannanhnunh@gmail.com");
     driver.findElement(By.xpath("//*[@id=\"fullName\"]")).sendKeys("Nguyen Thanh Luan");
     driver.findElement(By.xpath("//*[@id=\"password\"]")).sendKeys("P@s$w0rD");
     driver.findElement(By.xpath("//*[@id=\"rePassword\"]")).sendKeys("P@s$w0rD");
     driver.findElement(By.xpath("//*[@id=\"checkDetail\"]")).click();
     driver.findElement(By.xpath("//*[@id=\"register-submit\"]")).sendKeys(Keys.ENTER);
     // driver.quit();
    }

}
