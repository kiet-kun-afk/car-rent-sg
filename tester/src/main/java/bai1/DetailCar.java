package bai1;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class DetailCar {
	@Test
	public void DetailCar() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "E:\\game\\chromedriver-win64/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
    	String url="http://localhost:3001/carrentsg/car/51D%20-%20619.60";
    	driver.get(url);
     driver.findElement(By.xpath("//*[@id=\"navbarTogglerDemo03\"]/ul/li[4]/button")).sendKeys(Keys.ENTER);
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"un\"]")).sendKeys("0928199582");
     driver.findElement(By.xpath("//*[@id=\"pw\"]")).sendKeys("Luan76eao@");
     driver.findElement(By.xpath("//*[@id=\"loginWindow\"]/div/div/div/div[2]/div/form/div[5]/button")).sendKeys(Keys.ENTER);
     // chọn ngày
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"startDate\"]")).sendKeys("09012024");
     driver.findElement(By.xpath("//*[@id=\"startDate\"]")).sendKeys(Keys.TAB);
     driver.findElement(By.xpath("//*[@id=\"startDate\"]")).sendKeys("1225A");
     driver.findElement(By.xpath("//*[@id=\"endDate\"]")).sendKeys("09052024");
     driver.findElement(By.xpath("//*[@id=\"endDate\"]")).sendKeys(Keys.TAB);
     driver.findElement(By.xpath("//*[@id=\"endDate\"]")).sendKeys("1225A");
     driver.findElement(By.xpath("//*[@id=\"endDate\"]")).sendKeys(Keys.ENTER);
     Thread.sleep(2000);
     driver.findElement(By.xpath("//*[@id=\"chooseRent\"]")).click();
    }

}
