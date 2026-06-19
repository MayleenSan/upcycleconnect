package middleware
import (
    "net/http"
    "os"
    "github.com/golang-jwt/jwt/v5"
    "strings"
    "context"
)
func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc{
    return func(w http.ResponseWriter, r *http.Request){
       authHeader := r.Header.Get("Authorization")
       if authHeader == "" {
        http.Error(w,"No header",http.StatusUnauthorized)
        return
       }
       authHeader = strings.TrimPrefix(authHeader, "Bearer ")
       if authHeader == "" {
        http.Error(w,"No header",http.StatusUnauthorized)
        return
       }
       token , err := jwt.Parse(authHeader,func(token *jwt.Token) (interface{}, error) {
        return []byte(os.Getenv("JWT_SECRET")), nil
       })
       if err != nil || !token.Valid{
        http.Error(w,"Token false or expired",http.StatusUnauthorized)
        return
       }
       claims := token.Claims.(jwt.MapClaims)
        role := claims["role"]
        ctx := context.WithValue(r.Context(), "role", role)
        next(w, r.WithContext(ctx))
    }
}
func RoleMiddleware(role string , next http.HandlerFunc)http.HandlerFunc{
    return func(w http.ResponseWriter, r *http.Request){
        userRole := r.Context().Value("role")
        if userRole != role{
            http.Error(w,"You can't join this page",http.StatusUnauthorized)
            return
        }
        next(w,r)
    }
}
