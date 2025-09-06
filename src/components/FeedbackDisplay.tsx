import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle, TrendingUp } from "lucide-react";

interface FeedbackSection {
  title: string;
  score: number;
  feedback: string[];
  suggestions: string[];
}

interface FeedbackDisplayProps {
  feedback: {
    overallScore: number;
    sections: FeedbackSection[];
    strengths: string[];
    improvements: string[];
    missingKeywords: string[];
  };
}

export const FeedbackDisplay = ({ feedback }: FeedbackDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-success" />;
    if (score >= 60) return <AlertCircle className="w-5 h-5 text-warning" />;
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Resume Score</span>
            <div className="flex items-center space-x-2">
              {getScoreIcon(feedback.overallScore)}
              <span className={`text-2xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                {feedback.overallScore}/100
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={feedback.overallScore} className="h-3" />
          <p className="text-muted-foreground mt-2">
            {feedback.overallScore >= 80 
              ? "Excellent! Your resume is well-optimized for the target role."
              : feedback.overallScore >= 60
              ? "Good foundation with room for improvement."
              : "Significant improvements needed to match the target role."}
          </p>
        </CardContent>
      </Card>

      {/* Section Scores */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {feedback.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{section.title}</h3>
                <div className="flex items-center space-x-2">
                  {getScoreIcon(section.score)}
                  <span className={`font-bold ${getScoreColor(section.score)}`}>
                    {section.score}/100
                  </span>
                </div>
              </div>
              <Progress value={section.score} className="h-2" />
              
              {section.feedback.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Feedback:</h4>
                  <ul className="space-y-1">
                    {section.feedback.map((item, i) => (
                      <li key={i} className="text-sm flex items-start space-x-2">
                        <span className="text-muted-foreground">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {section.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Suggestions:</span>
                  </h4>
                  <ul className="space-y-1">
                    {section.suggestions.map((item, i) => (
                      <li key={i} className="text-sm flex items-start space-x-2">
                        <span className="text-primary">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="text-success flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Key Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="text-warning flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Missing Keywords */}
      {feedback.missingKeywords.length > 0 && (
        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle>Missing Keywords</CardTitle>
            <p className="text-muted-foreground text-sm">
              Consider including these relevant keywords to improve your resume's visibility
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {feedback.missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};