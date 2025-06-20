# ---------- build stage ----------
FROM maven:3.9.7-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests          # stvara target/*.jar

# ---------- run stage ----------
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
