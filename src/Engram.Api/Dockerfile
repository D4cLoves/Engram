FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Engram.Domain/Engram.Domain.csproj", "src/Engram.Domain/"]
COPY ["src/Engram.Application/Engram.Application.csproj", "src/Engram.Application/"]
COPY ["src/Engram.Infrastructure/Engram.Infrastructure.csproj", "src/Engram.Infrastructure/"]
COPY ["src/Engram.Api/Engram.Api.csproj", "src/Engram.Api/"]
RUN dotnet restore "src/Engram.Api/Engram.Api.csproj"
COPY . .
WORKDIR "/src/src/Engram.Api"
RUN dotnet build "./Engram.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Engram.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Engram.Api.dll"]
