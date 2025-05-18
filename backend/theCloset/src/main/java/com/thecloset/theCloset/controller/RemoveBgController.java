package com.thecloset.theCloset.controller;

import org.springframework.beans.factory.annotation.Value;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;


@RestController
@RequestMapping("/api/image")
public class RemoveBgController {

    @Value("${remove.bg.api.key}")
    private String removeBgApiKey;


    @PostMapping("/remove-background")
    public ResponseEntity<byte[]> removeBackground(@RequestParam("image") MultipartFile image) {
        try {
            HttpClient httpClient = HttpClients.createDefault();

            HttpPost request = new HttpPost("https://api.remove.bg/v1.0/removebg");
            request.addHeader("X-Api-Key", removeBgApiKey);

            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder.addBinaryBody("image_file", image.getBytes(), ContentType.APPLICATION_OCTET_STREAM, image.getOriginalFilename());
            builder.addTextBody("size", "auto");

            request.setEntity(builder.build());

            HttpResponse response = httpClient.execute(request);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            response.getEntity().writeTo(outputStream);
            byte[] imageBytes = outputStream.toByteArray();

            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

