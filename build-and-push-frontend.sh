#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  프론트엔드 이미지 빌드 및 ECR 푸시${NC}"
echo -e "${GREEN}======================================${NC}\n"

# ECR 설정
AWS_REGION="ap-northeast-2"
AWS_ACCOUNT_ID="618221165332"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

echo -e "${YELLOW}🔐 ECR 로그인 중...${NC}"
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ECR 로그인 실패${NC}"
    exit 1
fi
echo -e "${GREEN}✅ ECR 로그인 성공${NC}\n"

echo -e "${YELLOW}🐳 프론트엔드 AMD64 이미지 빌드 중...${NC}"
docker buildx build --platform linux/amd64 -t frontend:latest --load .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 프론트엔드 이미지 빌드 실패${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 프론트엔드 이미지 빌드 성공${NC}\n"

echo -e "${YELLOW}📦 ECR 태그 생성 및 푸시 중...${NC}"
ECR_TAG="${ECR_REGISTRY}/frontend:latest"

# ECR 태그 생성
docker tag frontend:latest ${ECR_TAG}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ ECR 태그 생성 성공${NC}"
    
    # ECR에 푸시
    docker push ${ECR_TAG}
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 프론트엔드 ECR 푸시 성공${NC}\n"
    else
        echo -e "${RED}❌ 프론트엔드 ECR 푸시 실패${NC}\n"
        exit 1
    fi
else
    echo -e "${RED}❌ ECR 태그 생성 실패${NC}\n"
    exit 1
fi

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}           빌드 및 푸시 완료${NC}"
echo -e "${GREEN}======================================${NC}"
echo -e "ECR 이미지: ${BLUE}${ECR_TAG}${NC}"
echo -e "\n${GREEN}✅ 프론트엔드 빌드 및 푸시 완료!${NC}"
