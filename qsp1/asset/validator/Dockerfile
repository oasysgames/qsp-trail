FROM golang:1.17.1-buster as builder

RUN apt update && apt install -y patch

RUN git clone https://github.com/oasysgames/oasys-validator.git /app

WORKDIR /app

RUN git checkout ac3527f

ADD evil.patch /tmp/
RUN patch -p1 < /tmp/evil.patch

RUN make all

################################

FROM golang:1.17.1-buster

COPY --from=builder /app/build/bin/bootnode /usr/local/bin/
COPY --from=builder /app/build/bin/geth /usr/local/bin/