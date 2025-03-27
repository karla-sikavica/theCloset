package com.thecloset.theCloset;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;




@SpringBootApplication
public class TheClosetApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheClosetApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(DataSource dataSource) {
		return args -> {
			try (var conn = dataSource.getConnection();
				 var stmt = conn.createStatement();
				 var rs = stmt.executeQuery("SELECT COUNT(*) FROM subcategory")) {
				rs.next();
				System.out.println("📦 Broj subkategorija: " + rs.getInt(1));
			}
		};
	}

}
