import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Database, Eye, Share2, Lock, UserCheck, Trash2, RefreshCw, Mail } from "lucide-react"

const sections = [
  {
    number: "1",
    icon: Database,
    title: "Informações que Coletamos",
    content: (
      <div className="space-y-5">
        <div className="bg-muted/40 rounded-2xl p-5 space-y-3">
          <p className="font-semibold text-foreground">a) Dados fornecidos pelo usuário:</p>
          <ul className="space-y-2">
            {[
              "Nome, telefone e e-mail do tutor (para criação de conta e suporte).",
              "Informações sobre o pet: nome, espécie, raça, idade, peso, sexo e hábitos (alimentação, comportamento, histórico de vacinas, entre outros).",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-muted/40 rounded-2xl p-5 space-y-3">
          <p className="font-semibold text-foreground">b) Dados coletados automaticamente:</p>
          <ul className="space-y-2">
            {[
              "Informações de uso do aplicativo (tempo de uso, funcionalidades acessadas).",
              "Identificadores de dispositivo (modelo, sistema operacional, idioma, IP, versão do app).",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-muted/40 rounded-2xl p-5 space-y-3">
          <p className="font-semibold text-foreground">c) Dados opcionais:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-2 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
              <span className="leading-relaxed">Fotos ou vídeos enviados voluntariamente pelo usuário para auxiliar nas análises de comportamento e bem-estar do pet.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: "2",
    icon: Eye,
    title: "Finalidade do Uso dos Dados",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">Os dados coletados são utilizados para:</p>
        <ul className="space-y-3">
          {[
            "Personalizar as recomendações de cuidado e prevenção para cada pet.",
            "Aprimorar os modelos de inteligência artificial e a experiência no aplicativo.",
            "Garantir suporte técnico e comunicação com o usuário.",
            "Cumprir obrigações legais e de segurança digital.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "3",
    icon: Shield,
    title: "Natureza das Informações e Limites do Serviço",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-lg">
          O <strong>Bitzy não é um serviço de consulta veterinária, diagnóstico, prescrição de tratamento ou telemedicina</strong>.
          Todas as informações geradas têm <strong>caráter educativo e preventivo</strong>, com o objetivo de orientar
          o tutor sobre possíveis cuidados e incentivar a busca de atendimento veterinário profissional quando necessário.
        </p>
        <div className="flex gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
          <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 leading-relaxed">
            Em caso de dúvida, emergência ou suspeita de doença, o tutor deve <strong>sempre consultar um médico-veterinário</strong>.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "4",
    icon: Share2,
    title: "Compartilhamento de Dados",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-lg">
          O Bitzy <strong>não vende nem compartilha dados pessoais</strong> com terceiros para fins comerciais. Os dados
          dos usuários são utilizados para levantamento próprio com o fim de exibir publicidade segmentada a anunciantes
          — como quantos usuários são donos de cães ou gatos — porém <strong>os dados ficam armazenados com segurança
          pela Bitzy</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed text-lg">Os dados podem ser compartilhados apenas nas seguintes situações:</p>
        <ul className="space-y-3">
          {[
            "Com prestadores de serviço que auxiliam na operação do app (como provedores de nuvem e análise de dados), sempre sob contrato e confidencialidade.",
            "Quando exigido por lei, ordem judicial ou autoridade competente.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "5",
    icon: Lock,
    title: "Armazenamento e Segurança",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-lg">
          Os dados são armazenados em servidores seguros e protegidos por medidas técnicas e administrativas adequadas
          para evitar acessos não autorizados, perda ou alteração. O Bitzy adota <strong>criptografia e controle de
          acesso restrito</strong>, em conformidade com a{" "}
          <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong>.
        </p>
      </div>
    ),
  },
  {
    number: "6",
    icon: UserCheck,
    title: "Direitos do Usuário",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          De acordo com a LGPD, o usuário tem direito a:
        </p>
        <ul className="space-y-3">
          {[
            "Confirmar a existência de tratamento de dados.",
            "Acessar, corrigir ou atualizar seus dados.",
            "Solicitar anonimização, bloqueio ou exclusão de dados pessoais.",
            "Revogar o consentimento a qualquer momento.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted-foreground bg-muted/50 rounded-xl p-4">
          As solicitações podem ser feitas por e-mail:{" "}
          <a href="mailto:contato@bitzy.com.br" className="text-primary font-medium hover:underline">
            contato@bitzy.com.br
          </a>
        </p>
      </>
    ),
  },
  {
    number: "7",
    icon: Trash2,
    title: "Retenção e Exclusão de Dados",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        Os dados são mantidos apenas pelo tempo necessário para cumprir as finalidades desta Política. O usuário pode
        solicitar a <strong>exclusão definitiva da conta e dos dados associados</strong> a qualquer momento.
      </p>
    ),
  },
  {
    number: "8",
    icon: RefreshCw,
    title: "Alterações nesta Política",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias, ajustes legais ou
        novas funcionalidades. As alterações serão comunicadas <strong>dentro do aplicativo ou por e-mail</strong>.
      </p>
    ),
  },
  {
    number: "9",
    icon: Mail,
    title: "Contato",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground leading-relaxed text-lg">
          Se você tiver dúvidas, sugestões ou solicitações relacionadas à privacidade, entre em contato:
        </p>
        <a
          href="mailto:contato@bitzy.com.br"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          <Mail className="w-4 h-4" />
          contato@bitzy.com.br
        </a>
        <p className="text-muted-foreground text-sm">📍 Responsável pelo tratamento de dados: <strong>Bitzy Tecnologia e Bem-Estar Pet</strong></p>
      </div>
    ),
  },
  {
    number: "10",
    icon: UserCheck,
    title: "Consentimento",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        Ao utilizar o Bitzy, o usuário <strong>declara estar ciente e de acordo com esta Política de Privacidade</strong>,
        reconhecendo que o aplicativo fornece <strong>orientações gerais baseadas em inteligência artificial, sem
        substituir a avaliação de um profissional veterinário</strong>.
      </p>
    ),
  },
]

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-32 h-10">
              <Image src="https://i.imgur.com/mMtHpH1.jpeg" alt="Bitzy Logo" fill className="object-contain object-left" />
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar ao início
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Documento Legal
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground text-lg">
            Última atualização: <strong>16 de outubro de 2025</strong>
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg max-w-2xl">
            Bem-vindo(a) ao <strong>Bitzy</strong>. A privacidade e a segurança dos seus dados são prioridades para nós.
            Esta política explica como coletamos, usamos e protegemos suas informações.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.number}
              className="bg-card border-2 border-border/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Artigo {section.number}
                  </span>
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                </div>
              </div>
              <div className="pl-14">{section.content}</div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 rounded-3xl p-8 text-center">
          <p className="text-lg font-semibold text-foreground mb-2">
            Sua privacidade importa para nós. Cuidamos dos seus dados como cuidamos dos pets. 🐾
          </p>
          <p className="text-muted-foreground">
            Dúvidas?{" "}
            <a href="mailto:contato@bitzy.com.br" className="text-primary font-medium hover:underline">
              contato@bitzy.com.br
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}