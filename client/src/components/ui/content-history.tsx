import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentHistoryProps {
  entries: any[];
  onUpload?: (entryId: string) => void;
}

export default function ContentHistory({ entries, onUpload }: ContentHistoryProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal':
        return 'fas fa-book';
      case 'affirmation':
        return 'fas fa-heart';
      case 'prompt':
        return 'fas fa-lightbulb';
      default:
        return 'fas fa-feather';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal':
        return 'bg-purple-600/20 text-purple-300';
      case 'affirmation':
        return 'bg-pink-600/20 text-pink-300';
      case 'prompt':
        return 'bg-amber-600/20 text-amber-300';
      default:
        return 'bg-accent/20 text-accent';
    }
  };

  if (!entries || entries.length === 0) {
    return (
      <Card className="glass-card border-border">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Content History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <i className="fas fa-inbox text-accent text-4xl mb-4 opacity-50"></i>
            <p className="font-body text-muted-foreground">
              No content yet. Start creating your mystical journey!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-display text-2xl">Content History</CardTitle>
          <span className="font-accent text-sm text-muted-foreground">
            {entries.length} total entries
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border border-border/50 hover:border-accent/50 transition-all duration-300"
                data-testid={`entry-item-${entry.id}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <i className={`${getTypeIcon(entry.type)} text-accent`}></i>
                    <div>
                      <h4 className="font-display text-lg font-semibold">
                        {entry.title || 'Untitled Entry'}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTypeColor(entry.type)}>
                          {entry.type}
                        </Badge>
                        {entry.metadata?.generatedByAI && (
                          <Badge className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300">
                            <i className="fas fa-wand-magic-sparkles mr-1 text-xs"></i>
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="font-accent text-xs text-muted-foreground">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                
                <p className="font-body text-sm text-muted-foreground line-clamp-2 mt-3">
                  {entry.content}
                </p>

                {entry.prompt && (
                  <div className="mt-3 p-2 rounded bg-accent/10 border border-accent/20">
                    <span className="font-accent text-xs text-accent">Prompt:</span>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {entry.prompt}
                    </p>
                  </div>
                )}

                {onUpload && (
                  <div className="mt-3 flex justify-end">
                    <Button
                      onClick={() => onUpload(entry.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <i className="fas fa-upload mr-1"></i>
                      Save to Notion
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}