# --- Étape 1 : compilation du binaire Go ---
FROM golang:1.25-alpine AS build
WORKDIR /app

# On copie d'abord les fichiers de dépendances (cache Docker : ne re-télécharge
# les modules que si go.mod/go.sum changent).
COPY go.mod go.sum ./
RUN go mod download

# Puis le reste du code, et on compile un binaire statique (CGO désactivé).
COPY . .
RUN CGO_ENABLED=0 go build -o /upcycle-api .

# --- Étape 2 : image finale minimale ---
FROM alpine:3.20
# ca-certificates : nécessaire pour le TLS de l'envoi d'emails (SMTP Gmail).
RUN apk add --no-cache ca-certificates tzdata
COPY --from=build /upcycle-api /upcycle-api
EXPOSE 8085
CMD ["/upcycle-api"]
