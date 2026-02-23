FROM jenkins/jenkins:lts-jdk17

# Switch to root to install packages
USER root

# Install Docker CLI, Git, CA certificates, Node.js, and Curl
RUN apt-get update && apt-get install -y --no-install-recommends \
    docker.io \
    git \
    ca-certificates \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && update-ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN jenkins-plugin-cli --plugins \
    workflow-aggregator \
    docker-workflow \
    git \
    junit \
    allure-jenkins-plugin

# Switch back to jenkins user
USER jenkins
