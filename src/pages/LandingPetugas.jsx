import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const LandingPetugas = () => {
  const quickActions = [
    {
      title: "Transaksi Baru",
      description: "Buat transaksi laundry baru",
      icon: "📝",
      link: "/petugas/transaksi/tambah",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      hoverGradient: "hover:from-blue-600 hover:to-cyan-700"
    },
    {
      title: "Status Cucian",
      description: "Update status cucian pelanggan",
      icon: "⏳",
      link: "/petugas/transaksi",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      hoverGradient: "hover:from-amber-600 hover:to-orange-700"
    },
    {
      title: "Cucian Selesai",
      description: "Kelola cucian yang sudah selesai",
      icon: "✅",
      link: "/petugas/transaksi/selesai",
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      hoverGradient: "hover:from-emerald-600 hover:to-green-700"
    },
    {
      title: "Data Pelanggan",
      description: "Lihat dan kelola data pelanggan",
      icon: "👥",
      link: "/petugas/pelanggan",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      hoverGradient: "hover:from-purple-600 hover:to-violet-700"
    },
    {
      title: "Layanan",
      description: "Kelola layanan laundry",
      icon: "🏷️",
      link: "/petugas/layanan",
      gradient: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      hoverGradient: "hover:from-indigo-600 hover:to-blue-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <Header link="/petugas" title="Dashboard Petugas" />

        {/* Welcome Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Selamat Datang, Petugas! 🧺
              </h2>
              <p className="text-gray-600 text-lg">
                Kelola transaksi laundry dan layani pelanggan dengan baik dan efisien.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl opacity-20">👨‍💼</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              ⚡ Aksi Cepat
            </span>
          </h3>
          <p className="text-gray-600">Pilih menu untuk mengelola sistem laundry</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="group">
              <div className={`bg-gradient-to-br ${action.bgGradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 backdrop-blur-sm overflow-hidden`}>
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
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">Aktif</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className={`px-6 py-3 bg-gradient-to-r ${action.gradient} ${action.hoverGradient} transition-all duration-300`}>
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium opacity-90">
                      Akses Fitur
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

        {/* Info Footer */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Sistem Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Dashboard Petugas</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Sistem Manajemen Laundry • {new Date().getFullYear()}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPetugas;
