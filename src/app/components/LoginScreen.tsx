import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Shield,
  Lock,
  Building2,
  Languages,
} from "lucide-react";
import { Logo } from "./Logo";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<
    "microsoft" | "google" | null
  >(null);
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("en");

  // Language options for the interface
  const languageOptions = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "ur", name: "Urdu", native: "اردو" },
    { code: "ta", name: "Tamil", native: "தமிழ்" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "mr", name: "Marathi", native: "मराठी" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", native: "മലയാളം" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
    { code: "or", name: "Odia", native: "ଓଡିଆ" },
    { code: "as", name: "Assamese", native: "অসমীয়া" },
  ];

  const handleProviderLogin = async (
    provider: "microsoft" | "google",
  ) => {
    setIsLoading(true);
    setLoadingProvider(provider);
    // Simulate SSO authentication
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setLoadingProvider(null);
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <Card className="w-full max-w-md fluent-card fluent-shadow transition-all duration-200 ease-out hover:fluent-shadow-lg">
        <CardHeader className="text-center space-y-6 pb-[8px] pt-[24px] pr-[24px] pl-[24px]">
          <div className="mx-auto">
            <Logo variant="full" className="justify-center" />
          </div>
          <div className="space-y-2">
            <CardDescription className="text-gray-600" style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 400, fontSize: '1rem' }}>
              Intelligent Document Processing Platform
            </CardDescription>
            <div className="flex items-center justify-center space-x-2 text-gray-500 mt-4" style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '0.875rem' }}>
              <Lock className="w-4 h-4 text-blue-600" />
              <span>
                Enterprise-grade security & compliance
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-[0px] pr-[32px] pb-[24px] pl-[32px]">
          <div className="space-y-6">
            {/* Enterprise Login Buttons */}
            <div className="space-y-4">
              {/* Microsoft Enterprise Login */}
              <Button
                onClick={() => handleProviderLogin("microsoft")}
                disabled={isLoading}
                className="w-full h-14 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white"
              >
                {loadingProvider === "microsoft" ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                    <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500 }}>Connecting to Microsoft...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"
                        fill="#00A4EF"
                      />
                    </svg>
                    <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1rem' }}>
                      Continue with Microsoft
                    </span>
                  </div>
                )}
              </Button>

              {/* Google Enterprise Login */}
              <Button
                onClick={() => handleProviderLogin("google")}
                disabled={isLoading}
                className="w-full h-14 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white"
              >
                {loadingProvider === "google" ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                    <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 500 }}>Connecting to Google...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 600, fontSize: '1rem' }}>
                      Continue with Google
                    </span>
                  </div>
                )}
              </Button>
            </div>

            {/* Enterprise Security Information */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-gray-600 rounded-xl bg-transparent px-[16px] py-[6px]" style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '0.875rem' }}>
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>
                    SAML 2.0 & OAuth 2.0 compliant
                    authentication
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 text-gray-600 rounded-xl bg-transparent px-[16px] py-[6px]" style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '0.875rem' }}>
                  <Building2 className="w-5 h-5 text-green-600" />
                  <span>
                    Enterprise-grade security & compliance
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 rounded-xl bg-transparent px-[16px] py-[6px]">
                  <Lock className="w-5 h-5 text-orange-600" />
                  <span>
                    Multi-factor authentication enforced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}