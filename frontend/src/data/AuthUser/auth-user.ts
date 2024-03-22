import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostRegisterUser {
  name: string;
  username: string;
  password: string;
}

interface PostLoginUser {
  username: string;
  password: string;
}

const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

const setRefreshTokenId = (refresh: string) => {
  localStorage.setItem("refreshIdToken", refresh);
};

export function UseRegisterUser() {
  const route = useRouter();
  const [errorMensage, setErrorMensage] = useState<string | null>(null);

  async function signin(data: PostLoginUser) {
    try {
      const response = await api.post("/login", data);
      const token = response.data.token;
      const refreshToken = response.data.refreshToken.id;
      if (token) {
        setToken(token);
        setRefreshTokenId(refreshToken);
        setErrorMensage(null);
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
          "authToken"
        )}`;
        route.push("/home");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          setErrorMensage("A senha ou usuário está incorreto");
          return;
        }
      }
    }
  }

  const queryClient = useQueryClient();
  async function sigout() {
    localStorage.removeItem("authToken");
    axios.defaults.headers.common.Authorization = undefined;
    queryClient.clear();
  }

  async function registerPost(data: PostRegisterUser) {
    try {
      await api.post("/register", data);
      route.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 400) {
          setErrorMensage("Já existe este usuário");
          return;
        }
      }
    }
  }

  const { mutateAsync: postRegister } = useMutation({
    mutationFn: registerPost,
  });

  const { mutateAsync: sigoutUser } = useMutation({
    mutationFn: sigout,
    onSuccess: () => {
      route.push("/");
    },
  });

  return { postRegister, errorMensage, signin, sigoutUser };
}

export async function refreshToken() {
  try {
    const response = await api.post("/refresh", {
      refresh_token: localStorage.getItem("refreshIdToken"),
    });
    if (response.data) {
      localStorage.setItem("authToken", response.data);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data}`;
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
  }
}
