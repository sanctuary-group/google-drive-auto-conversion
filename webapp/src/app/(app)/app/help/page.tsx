import { Book, ExternalLink, Mail, MessageCircle, Video } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    q: "OCR の精度が悪いです。改善方法はありますか?",
    a: "1) 元の PDF が高解像度であるほど精度が上がります。2) 取引台帳の詳細画面から手動修正できます。3) Gemini API 連携を有効化すると、正規表現で取れなかった項目を AI が補完します(設定→「OCR / Parser」)。",
  },
  {
    q: "Google Drive 連携の監視フォルダ ID はどこで確認できますか?",
    a: "Google Drive で対象フォルダを開き、URL の末尾(/folders/XXXXX 部分)が ID です。「設定 → Google Drive 連携」に貼り付けてください。",
  },
  {
    q: "請求書ではなく見積書/領収書も処理できますか?",
    a: "はい。書類種別は自動判定されます。台帳の「書類種別」カラムで見積書/領収書として記録されます。",
  },
  {
    q: "源泉徴収税額がある請求書はどう扱われますか?",
    a: "合計金額として「税込合計(源泉徴収前)」が記録され、源泉徴収税額は内容サマリーに含まれます。「差引請求額」を採用するか「税込合計」を採用するかは設定で切替できます。",
  },
  {
    q: "ユーザー(末端作業者)を増やすと追加料金は発生しますか?",
    a: "Enterprise プランは会社単位の月額で、ユーザー数は無制限です。Standard 以下は 5 名まで、超過分は +¥500/名/月の追加課金になります。",
  },
  {
    q: "freee / マネーフォワード連携を有効化したい",
    a: "マスター管理 → API 連携 から各サービスの「接続する」ボタンで OAuth 認可を実行してください(2026 年 7 月公開予定)。",
  },
];

export default function HelpPage() {
  return (
    <PageShell title="ヘルプ・サポート" description="使い方ガイド・FAQ・お問い合わせ">
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <ResourceCard icon={<Book className="size-5" />} title="ドキュメント" desc="使い方ガイド・APIリファレンス" link="#" />
        <ResourceCard icon={<Video className="size-5" />} title="動画チュートリアル" desc="2 分で始める初期セットアップ" link="#" />
        <ResourceCard icon={<MessageCircle className="size-5" />} title="コミュニティ" desc="ユーザー同士で質問・回答" link="#" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm">よくある質問</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {faqs.map((f, i) => (
              <details key={i} className="py-3 group">
                <summary className="cursor-pointer text-sm font-medium list-none flex items-start gap-2">
                  <span className="text-muted-foreground group-open:rotate-90 transition-transform shrink-0">›</span>
                  <span>{f.q}</span>
                </summary>
                <div className="text-sm text-muted-foreground pt-2 pl-5">{f.a}</div>
              </details>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Mail className="size-4" />
            お問い合わせ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            上記で解決しない場合は、サポートチームにお問い合わせください。営業時間内(平日 9:00-18:00 JST)に返信します。
          </p>
          <div className="flex gap-2">
            <Button>サポートにメールする</Button>
            <Button variant="outline">問い合わせ履歴</Button>
          </div>
          <div className="mt-6 pt-4 border-t text-xs text-muted-foreground space-y-1">
            <div>バージョン: <span className="font-mono">v0.1.0 (モック)</span></div>
            <div>最終リリース: 2026-06-09</div>
            <div>ステータス: <a className="text-primary underline" href="#">status.example.com で確認</a></div>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}

function ResourceCard({ icon, title, desc, link }: { icon: React.ReactNode; title: string; desc: string; link: string }) {
  return (
    <a href={link} className="block">
      <Card className="hover:bg-muted/30 transition-colors h-full">
        <CardContent className="py-5 flex items-start gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm flex items-center gap-1">
              {title}
              <ExternalLink className="size-3 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
