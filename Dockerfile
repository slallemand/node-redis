FROM registry.access.redhat.com/ubi9/nodejs-16

# Add application sources to a directory that the assemble script expects them
# and set permissions so that the container runs without root access
USER 0
#ADD . /tmp/src
COPY . .
RUN chown -R 1001:0 /opt/app-root/src
USER 1001

# Install the dependencies
RUN npm install

# Set the default command for the resulting image
CMD npm start

