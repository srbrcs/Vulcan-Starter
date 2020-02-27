FROM node:8.15.1


RUN useradd -rm -d /opt/src -s /bin/bash -g root -G sudo -u 1001 nodeapp
USER nodeapp

WORKDIR /opt/src

RUN ls -lah

USER 0
# Install 'meteor'
RUN curl https://install.meteor.com/ | bash



USER 1001
COPY . .
USER 0
RUN ls -lah .meteor
RUN chmod 0774 /opt/src/.meteor/meteor

USER 1001
# Sanity check your Meteor installation
RUN echo -e "\nMeteor version..."; meteor --version; export METEOR_NODE_VERSION=$(meteor node --version);  echo -e "Meteor Node version...\n ${METEOR_NODE_VERSION}";

RUN meteor npm install


#USER 1001
RUN meteor update

CMD ["/bin/bash", "-c", "npm start"]
