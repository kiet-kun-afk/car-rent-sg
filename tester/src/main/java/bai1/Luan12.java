package bai1;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class Luan12 {
	@Test
	public void loginwithCus() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "E:\\game\\chromedriver-win64/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
    	String url="http://localhost:3001/carrentsg";
    	driver.get(url);
     driver.findElement(By.xpath("//*[@id=\"navbarTogglerDemo03\"]/ul/li[5]/button")).click();
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"un\"]")).sendKeys("0928199582");
     driver.findElement(By.xpath("//*[@id=\"pw\"]")).sendKeys("Luan76eao@");
     driver.findElement(By.xpath("//*[@id=\"loginWindow\"]/div/div/div/div[2]/div/form/div[5]/button")).sendKeys(Keys.ENTER);
     // driver.quit();
    }
}
