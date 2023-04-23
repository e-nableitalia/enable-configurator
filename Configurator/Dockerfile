#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base


WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Configurator/Configurator.csproj", "Configurator/"]
RUN dotnet restore "Configurator/Configurator.csproj"
COPY . .
WORKDIR "/src/Configurator"
RUN dotnet build "Configurator.csproj" -c Development -o /app/build

FROM build AS publish
RUN dotnet publish "Configurator.csproj" -c Development -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app/
COPY --from=publish /app/publish .




ENTRYPOINT ["dotnet", "Configurator.dll"]