import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText, AlertTriangle, Shield, Users, Lock, Gavel, Mail } from "lucide-react"

const sections = [
  {
    number: "1",
    icon: FileText,
    title: "Sobre o Bitzy",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg">
          O <strong>Bitzy</strong> é um aplicativo desenvolvido para fornecer <strong>análises, dicas e orientações
          educativas</strong> sobre o cuidado e a prevenção de doenças em animais de estimação, com base em dados
          inseridos pelos tutores e processados por algoritmos de inteligência artificial.
        </p>
        <div className="mt-4 flex gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 leading-relaxed">
            <strong>Importante:</strong> O Bitzy <strong>não oferece diagnóstico médico-veterinário, prescrição de
            medicamentos, nem substitui a consulta com um profissional veterinário habilitado.</strong> As informações
            têm caráter informativo e educativo.
          </p>
        </div>
      </>
    ),
  },
  {
    number: "2",
    icon: Users,
    title: "Aceitação dos Termos",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          Ao criar uma conta, acessar ou usar o Bitzy, o usuário declara que:
        </p>
        <ul className="space-y-3">
          {[
            "Leu, entendeu e concorda com estes Termos de Uso e com a Política de Privacidade.",
            "É maior de 18 anos ou possui autorização de um responsável legal para utilizar o aplicativo.",
            "Fornecerá informações verdadeiras e atualizadas sobre si e sobre o pet.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Se você <strong>não concordar com estes termos</strong>, não deve utilizar o Bitzy.
        </p>
      </>
    ),
  },
  {
    number: "3",
    icon: Shield,
    title: "Uso Permitido",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          O usuário compromete-se a utilizar o Bitzy de forma ética e legal, abstendo-se de:
        </p>
        <ul className="space-y-3">
          {[
            "Inserir informações falsas, imprecisas ou ofensivas.",
            "Tentar acessar sistemas, bancos de dados ou informações de outros usuários.",
            "Utilizar o Bitzy para fins comerciais, publicitários ou ilícitos.",
            "Manipular, modificar, copiar ou reproduzir o conteúdo e o código do aplicativo sem autorização expressa.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1 w-2 h-2 rounded-full bg-destructive/60 flex-shrink-0 mt-2" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground bg-muted/50 rounded-xl p-4">
          O uso indevido poderá resultar na <strong>suspensão ou exclusão da conta</strong>, sem prejuízo das medidas legais cabíveis.
        </p>
      </>
    ),
  },
  {
    number: "4",
    icon: FileText,
    title: "Conteúdo Gerado pelo Usuário",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
          O Bitzy pode permitir o envio de <strong>dados, textos, fotos ou vídeos dos pets</strong> para fins de análise. Ao enviar esse conteúdo, o usuário:
        </p>
        <ul className="space-y-3">
          {[
            "Declara ser o legítimo titular ou possuir autorização para uso.",
            "Concede ao Bitzy uma licença não exclusiva, gratuita e limitada para armazenar, processar e usar os dados exclusivamente para o funcionamento e aprimoramento do serviço.",
            "Reconhece que os conteúdos enviados não devem conter informações pessoais sensíveis de terceiros.",
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
    number: "5",
    icon: AlertTriangle,
    title: "Responsabilidade e Limitações",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        O Bitzy e seus desenvolvedores <strong>não se responsabilizam por decisões, ações ou omissões</strong> tomadas
        pelo usuário com base nas informações geradas pelo aplicativo. As recomendações são resultado de processamento
        automatizado e <strong>não constituem opinião profissional, diagnóstico ou tratamento veterinário</strong>.
        O tutor é integralmente responsável pelas decisões sobre a saúde e o bem-estar de seu pet. O Bitzy não
        garante disponibilidade contínua do aplicativo, podendo realizar interrupções temporárias para manutenção ou melhorias.
      </p>
    ),
  },
  {
    number: "6",
    icon: Lock,
    title: "Propriedade Intelectual",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        Todo o conteúdo do Bitzy — incluindo textos, logotipos, algoritmos, design, marcas e banco de dados — é de
        <strong> propriedade exclusiva do Bitzy Tecnologia e Bem-Estar Pet</strong> e protegido por leis de direitos
        autorais e de propriedade industrial. É <strong>proibido copiar, distribuir, modificar ou explorar</strong> qualquer
        parte do aplicativo sem autorização prévia e por escrito.
      </p>
    ),
  },
  {
    number: "7",
    icon: Shield,
    title: "Privacidade e Proteção de Dados",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        O tratamento de dados pessoais segue rigorosamente a <strong>Política de Privacidade do Bitzy</strong> e a{" "}
        <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong>. O usuário pode acessar, corrigir
        ou solicitar a exclusão de seus dados a qualquer momento, conforme descrito na{" "}
        <Link href="/privacidade" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
          Política de Privacidade
        </Link>.
      </p>
    ),
  },
  {
    number: "8",
    icon: Users,
    title: "Suspensão e Encerramento de Conta",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-lg mb-4">O Bitzy poderá suspender ou encerrar contas de usuários que:</p>
        <ul className="space-y-3">
          {[
            "Violem estes Termos de Uso.",
            "Usem o aplicativo de forma indevida ou para fins ilícitos.",
            "Causem prejuízo à plataforma ou a outros usuários.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted-foreground">
          O usuário pode, a qualquer momento, solicitar o encerramento da conta e a exclusão dos dados armazenados.
        </p>
      </>
    ),
  },
  {
    number: "9",
    icon: FileText,
    title: "Alterações dos Termos",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        O Bitzy poderá atualizar estes Termos de Uso periodicamente. A versão vigente estará sempre disponível dentro
        do aplicativo e no site oficial. O uso contínuo do Bitzy após eventuais alterações implica{" "}
        <strong>aceitação das novas condições</strong>.
      </p>
    ),
  },
  {
    number: "10",
    icon: AlertTriangle,
    title: "Isenção de Garantias",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        O Bitzy é fornecido <strong>"como está"</strong>, sem garantias explícitas ou implícitas de desempenho,
        precisão ou adequação a um propósito específico. Embora busque fornecer informações precisas e úteis, o
        aplicativo <strong>não garante a exatidão absoluta das análises geradas por inteligência artificial</strong>.
      </p>
    ),
  },
  {
    number: "11",
    icon: Gavel,
    title: "Legislação Aplicável e Foro",
    content: (
      <p className="text-muted-foreground leading-relaxed text-lg">
        Estes Termos de Uso são regidos pelas leis da <strong>República Federativa do Brasil</strong>, especialmente
        pela <strong>Lei nº 13.709/2018 (LGPD)</strong> e pelo <strong>Código de Defesa do Consumidor</strong>. Em
        caso de controvérsias, fica eleito o foro da comarca de <strong>São Paulo/SP</strong>, com exclusão de
        qualquer outro, por mais privilegiado que seja.
      </p>
    ),
  },
  {
    number: "12",
    icon: Mail,
    title: "Contato",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground leading-relaxed text-lg">
          Dúvidas, solicitações ou reclamações podem ser encaminhadas para:
        </p>
        <a
          href="mailto:contato@bitzy.com.br"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          <Mail className="w-4 h-4" />
          contato@bitzy.com.br
        </a>
        <p className="text-muted-foreground text-sm">📍 Responsável: <strong>Bitzy Tecnologia e Bem-Estar Pet</strong></p>
      </div>
    ),
  },
]

export default function TermosPage() {
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
            <FileText className="w-4 h-4" />
            Documento Legal
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-muted-foreground text-lg">
            Última atualização: <strong>16 de outubro de 2025</strong>
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg max-w-2xl">
            Bem-vindo(a) ao <strong>Bitzy</strong>. Ao utilizar o aplicativo, você concorda com os presentes Termos de
            Uso e com nossa{" "}
            <Link href="/privacidade" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              Política de Privacidade
            </Link>
            . Por favor, leia atentamente antes de usar.
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
            Ao utilizar o Bitzy, você reconhece que leu, entendeu e aceita integralmente estes Termos de Uso. 🐾
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