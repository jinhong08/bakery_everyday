<div align="center">
	<h1>Bread Everyday Frontend</h1>
	<br>
</div>

## 1. 서비스 소개

### 1-1. 하루브레드 이란?

'하루브레드는 전국에 있는 베이커리의 맛있는 빵 패키지를 **구독**하여, 주기적으로 신선한 빵을 배송 받을 수 있는 **빵 구독 플랫폼**입니다.

### 1-2. 주요 기능

- **베이커리 등록 및 조회**
  - 베이커리 사장님은 자신의 베이커리를 '하루브레드'에 등록할 수 있습니다.
  - 소비자는 등록되어 있는 베이커리를 조회할 수 있습니다.

- **빵 패키지 등록 및 조회**
  - 베이커리 사장님은 자신의 베이커리에 빵 패키지를 구독 상품으로 등록하여 판매할 수 있습니다.
  - 소비자는 판매중인 빵 패키지를 조회할 수 있습니다.

- **빵 패키지 랭킹 및 추천**
  - 판매중인 빵 패키지의 판매 혹은 별점 순으로 랭킹을 조회할 수 있습니다.

- **빵 패키지 구독 결제**
  - 스텝페이의 구독 API를 사용하여, 빵 패키지를 매달 구독하여 결제할 수 있습니다.

<br />

## 2. 서비스 구조

### 2-1. 사용 기술

![플로우 차트](https://user-images.githubusercontent.com/65934968/212262048-d03a21f3-a9cf-487e-97e1-5e6cd1f42159.png)

![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=GraphQL&logoColor=white)

![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=Expo&logoColor=white)
![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=flat-square&logo=Apollo-GraphQL&logoColor=white)

![Java](https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=Spring-Boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=Spring-Security&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=flat-square&logo=Hibernate&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white)

![Naver Cloud Platform](https://img.shields.io/badge/Naver%20Cloud%20Platform-03C75A?style=flat-square&logo=Naver&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=Kubernetes&logoColor=white)
![Argo](https://img.shields.io/badge/Argo-EF7B4D?style=flat-square&logo=Argo&logoColor=white)
![Elastic Search](https://img.shields.io/badge/Elastic%20Search-005571?style=flat-square&logo=Elastic&logoColor=white)
![Fluent Bit](https://img.shields.io/badge/Fluent%20Bit-49BDA5?style=flat-square&logo=Fluent-Bit&logoColor=white)
![Kibana](https://img.shields.io/badge/Kibana-005571?style=flat-square&logo=Kibana&logoColor=white)

### 2-2. 배포 구조

![배포](https://user-images.githubusercontent.com/65934968/212266577-1b06defd-ad98-466c-a7a2-8072634dcbc9.png)

### 2-3. GraphQL Schema

[GraphQL Schema Link](https://github.com/daily-develop/subscribe-bakery-server/tree/main/src/main/resources/graphql)

### 2-4. Database Schema

![Database Schema](https://user-images.githubusercontent.com/65934968/212277572-4283dd64-b313-4529-8dae-5e7e25d5abf0.png)