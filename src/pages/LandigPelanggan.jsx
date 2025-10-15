import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const LandingPelanggan = () => {
  const id = localStorage.getItem("user_id");
  
  const quickActions = [
    {
      title: "Status Cucian",
      description: "Lihat status cucian Anda saat ini",
      icon: "👕",
      link: "/pelanggan/status",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      hoverGradient: "hover:from-blue-600 hover:to-cyan-700"
    },
    {
      title: "Riwayat Transaksi",
      description: "Lihat riwayat laundry Anda",
      icon: "📋",
      link: "/pelanggan/riwayat",
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      hoverGradient: "hover:from-emerald-600 hover:to-green-700"
    },
    {
      title: "Harga Layanan",
      description: "Cek daftar harga layanan kami",
      icon: "💰",
      link: "/pelanggan/harga",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      hoverGradient: "hover:from-purple-600 hover:to-violet-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Header link="/pelanggan" title="Dashboard Pelanggan" />

        {/* Welcome Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                Selamat Datang! 🌟
              </h2>
              <p className="text-gray-600 text-lg">
                Nikmati layanan laundry terbaik kami. Cek status cucian dan riwayat transaksi Anda dengan mudah.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl opacity-20">👗</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              ✨ Layanan Untuk Anda
            </span>
          </h3>
          <p className="text-gray-600">Pilih menu untuk mengakses layanan laundry</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="group">
              <div className={`bg-gradient-to-br ${action.bgGradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 backdrop-blur-sm overflow-hidden h-full`}>
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {action.description}
                      </p>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl shadow-sm group-hover:bg-white/90 transition-all duration-300 group-hover:scale-110">
                      <span className="text-3xl">{action.icon}</span>
                    </div>
                  </div>
                  
                  {/* Action Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Klik untuk akses</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Aktif</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className={`px-6 py-3 bg-gradient-to-r ${action.gradient} ${action.hoverGradient} transition-all duration-300`}>
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium opacity-90">
                      Akses Layanan
                    </span>
                    <span className="text-lg opacity-75 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Info Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3 mr-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold">Layanan Cepat & Berkualitas</h3>
            </div>
            <p className="text-pink-100 text-lg mb-4">
              Kami berkomitmen memberikan layanan laundry terbaik dengan hasil yang memuaskan dan tepat waktu
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold mb-1">Cepat</h4>
                <p className="text-sm text-pink-100">Proses 1-2 hari</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">✨</div>
                <h4 className="font-semibold mb-1">Bersih</h4>
                <p className="text-sm text-pink-100">Hasil maksimal</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl mb-2">💎</div>
                <h4 className="font-semibold mb-1">Terpercaya</h4>
                <p className="text-sm text-pink-100">Pengalaman bertahun-tahun</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        {id && (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">User ID: {id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Status: Aktif</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Dashboard Pelanggan • Sistem Laundry • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LandingPelanggan;
